import crypto from "crypto";
import fs from "fs";
import path from "path";
import knex, { Knex } from "knex";

import { recursiveWalkDir, parseFile, WikiLink } from "../utils";
import { File, Link, Tag, FileTag } from "./schema";

// TODO this should be in sync with paths created by remark-wiki-link
const sluggifyFilePath = (str: string) => {
  return str
    .replace(/\s+/g, "-")
    .replace(/\.\w+$/, "")
    .toLowerCase();
};

const resolveLinkToUrlPath = (link: string, sourceFilePath?: string) => {
  if (!sourceFilePath) {
    return link;
  }
  // needed to make path.resolve work correctly
  // becuase we store urls without leading slash
  const sourcePath = "/" + sourceFilePath;
  const dir = path.dirname(sourcePath);
  const resolved = path.resolve(dir, link);
  // remove leading slash
  return resolved.slice(1);
};

export class MarkdownDB {
  config: Knex.Config;
  db: Knex;

  constructor(config: Knex.Config) {
    this.config = config;
  }

  async init() {
    this.db = knex(this.config);
  }

  async indexFolder({
    folderPath,
    ignorePatterns = [],
  }: {
    folderPath: string;
    ignorePatterns?: RegExp[];
  }) {
    //  Temporary, we don't want to handle updates now
    //  so database is refreshed every time the folder
    //  is indexed
    await File.deleteTable(this.db);
    await Tag.deleteTable(this.db);
    await FileTag.deleteTable(this.db);
    await Link.deleteTable(this.db);

    await File.createTable(this.db);
    await Tag.createTable(this.db);
    await FileTag.createTable(this.db);
    await Link.createTable(this.db);

    const filePathsToIndex = recursiveWalkDir(folderPath);

    const filesToInsert: File[] = [];
    const fileTagsToInsert: FileTag[] = [];
    // TODO shouldn't available tags be explicitly defined in some config file
    // instead of being extracted from all files? I think it's better even from user perspective
    // as he can easily manage and see all the tags he is using
    // (he can qickly look up tag if he's not sure what term he was using in other files)
    // + it's easier to implement
    const tagsToInsert: Tag[] = [];
    const linksToInsert: Link[] = [];

    // TODO is there a better way to do this?
    // Temporary containter for storing links extracted from each file
    // as a map of file id -> extracted links.
    // This is used after all files have been parsed and added to filesToInsert
    // to resolve paths in links to target file ids
    const filesLinksMap: {
      [fileId: string]: {
        url: string;
        links: WikiLink[];
      };
    } = {};

    for (const filePath of filePathsToIndex) {
      if (ignorePatterns.some((pattern) => pattern.test(filePath))) {
        continue;
      }

      const fileToInsert: File = {
        _id: "",
        file_path: "",
        url_path: "",
        extension: "",
        metadata: null,
        filetype: null,
      };

      // id
      const encodedPath = Buffer.from(filePath, "utf-8").toString();
      const id = crypto.createHash("sha1").update(encodedPath).digest("hex");
      fileToInsert._id = id;

      // path
      fileToInsert.file_path = filePath;

      // url_path
      const pathRelativeToFolder = path.relative(folderPath, filePath);
      const urlPath = sluggifyFilePath(pathRelativeToFolder);
      fileToInsert.url_path = urlPath;

      // extension
      const [, extension] = filePath.match(/.(\w+)$/) || [];
      fileToInsert.extension = extension;

      if (!File.supportedExtensions.includes(extension)) {
        filesToInsert.push(fileToInsert);
        continue;
      }

      // metadata, tags, links
      const source: string = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });

      const { metadata, links } = parseFile(source);
      fileToInsert.filetype = metadata?.type || null;
      fileToInsert.metadata = metadata || null;

      // TODO is there a better way to do this?
      filesLinksMap[id] = {
        url: urlPath,
        links,
      };

      const tags = metadata?.tags || [];
      tags.forEach((tag: string) => {
        if (!tagsToInsert.some((t) => t.name === tag)) {
          tagsToInsert.push({ name: tag });
        }
        fileTagsToInsert.push({ file: id, tag });
      });

      filesToInsert.push(fileToInsert);
    }

    Object.entries(filesLinksMap).forEach(([fileId, { url, links }]) => {
      links.forEach(({ linkSrc, linkType }) => {
        const destPath = resolveLinkToUrlPath(linkSrc, url);
        const destFile = filesToInsert.find(
          (file) => file.url_path === destPath
        );
        const linkToInsert = {
          // _id: id,
          from: fileId,
          to: destFile?._id,
          link_type: linkType,
        };
        linksToInsert.push(linkToInsert);
      });
    });

    await File.batchInsert(this.db, filesToInsert);

    // TODO  what happens if some of the files were not inserted?
    // I guess inserting tags or links with such files used as foreign keys will fail too,
    // but need to check
    await Tag.batchInsert(this.db, tagsToInsert);
    await FileTag.batchInsert(this.db, fileTagsToInsert);
    await Link.batchInsert(this.db, linksToInsert);
  }

  async getFileById(id: string): Promise<File | null> {
    const file = await this.db.from("files").where("_id", id).first();
    return new File(file);
  }

  async getFileByUrl(url: string): Promise<File | null> {
    const file = await this.db.from("files").where("url_path", url).first();
    return new File(file);
  }

  async getFiles(query?: {
    folder?: string;
    filetypes?: string[];
    tags?: string[];
    extensions?: string[];
  }): Promise<File[]> {
    const { filetypes, tags, extensions, folder } = query || {};

    const files = await this.db
      // TODO join only if tags are specified ?
      .leftJoin("file_tags", "files._id", "file_tags.file")
      .where((builder) => {
        // TODO temporary solution before we have a proper way to filter files by and assign file types
        if (folder) {
          builder.whereLike("url_path", `${folder}/%`);
        }
        if (tags) {
          builder.whereIn("tag", tags);
        }

        if (extensions) {
          builder.whereIn("extension", extensions);
        }

        if (filetypes) {
          builder.whereIn("filetype", filetypes);
        }
      })
      .select("files.*")
      .from("files")
      .groupBy("_id");

    return files.map((file) => new File(file));
  }

  async getTags(): Promise<Tag[]> {
    const tags = await this.db("tags").select();
    return tags.map((tag) => new Tag(tag));
  }

  async getLinks(query?: {
    fileId: string;
    linkType?: "normal" | "embed";
    direction?: "forward" | "backward";
  }): Promise<Link[]> {
    const { fileId, direction = "forward", linkType } = query;
    const joinKey = direction === "forward" ? "from" : "to";
    const where = {
      [joinKey]: fileId,
    };
    if (linkType) {
      where["link_type"] = linkType;
    }
    const dbLinks = await this.db
      .select("links.*")
      .from("links")
      .rightJoin("files", `links.${joinKey}`, "=", "files._id")
      .where(where);

    const links = dbLinks.map((link) => new Link(link));
    return links;
  }

  _destroyDb() {
    this.db.destroy();
  }
}
