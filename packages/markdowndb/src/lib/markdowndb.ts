import crypto from "crypto";
import fs from "fs";
import path from "path";
import knex, { Knex } from "knex";

import { recursiveWalkDir, parseFile } from "../utils";
import { File, Link, Tag, FileTag } from "./schema";
import { DatabaseFile, DatabaseQuery } from "./types";

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

    // here we could also delete and create tables defined by user

    const filePathsToIndex = recursiveWalkDir(folderPath);

    const filesToInsert = [];
    const fileTagsToInsert = [];
    const fileLinksToInsert = [];
    // TODO shouldn't available tags be explicitly defined in some config file
    // instead of being extracted from all files? I think it's better even from user perspective
    // as he can easily manage and see all the tags he is using
    // (he can qickly look up tag if he's not sure what term he was using in other files)
    // + it's easier to implement
    const tagsToInsert = [];

    for (const filePath of filePathsToIndex) {
      const serializedFile = {
        _id: null,
        path: null,
        url_path: null,
        extension: null,
        metadata: null,
        filetype: null,
      };

      if (ignorePatterns.some((pattern) => pattern.test(filePath))) {
        continue;
      }

      // id
      const encodedPath = Buffer.from(filePath, "utf-8").toString();
      const id = crypto.createHash("sha1").update(encodedPath).digest("hex");
      serializedFile._id = id;

      // path
      serializedFile.path = filePath;

      // url_path
      const pathRelativeToFolder = path.relative(folderPath, filePath);
      serializedFile.url_path = pathRelativeToFolder;

      // extension
      const [, extension] = filePath.match(/.(\w+)$/) || [];
      serializedFile.extension = extension || null;

      if (!File.supportedExtensions.includes(extension)) {
        filesToInsert.push(serializedFile);
        continue;
      }

      // metadata, tags, links
      const source: string = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });

      const { metadata, links } = parseFile(source);

      const tags = metadata?.tags || [];
      tags.forEach((tag: string) => {
        if (!tagsToInsert.some((t) => t.name === tag)) {
          tagsToInsert.push({ name: tag });
        }
        fileTagsToInsert.push({ file: id, tag });
      });

      // TODO add slug

      filesToInsert.push({
        _id: id,
        path: filePath,
        url_path: pathRelativeToFolder,
        extension,
        metadata: JSON.stringify(metadata),
        filetype: metadata?.type || null,
      });
    }

    // console.log("filesToInsert", filesToInsert);
    // console.log("tagsToInsert", tagsToInsert);
    // console.log("fileTagsToInsert", fileTagsToInsert);

    await File.batchInsert(this.db, filesToInsert);
    await Tag.batchInsert(this.db, tagsToInsert);
    await FileTag.batchInsert(this.db, fileTagsToInsert);

    // TODO  what happens if some of the files were not inserted?
    // I guess inserting tags or links with such files used as foreign keys will fail too,
    // but need to check

    // const destPath = to.replace(/^\//, "");
    // // find the file with the same url path
    // const destFile = await this.db("files")
    //   .where({ _url_path: destPath })
    //   .first();

    // linksToInsert.push({
    //   ...link,
    //   to: destFile?._id,
    // });

    // await Link.batchInsert(this.db, fileLinksToInsert);
  }

  async getTags() {
    return this.db("tags")
      .select()
      .then((tags) => tags.map((tag) => tag.name));
  }

  async getLinks(options: GetLinksOptions): Promise<Link[]> {
    const { fileId, direction = "forward", linkType } = options;
    const joinKey = direction === "forward" ? "from" : "to";
    const query: any = {
      [joinKey]: fileId,
    };
    if (linkType) {
      query["link_type"] = linkType;
    }
    const dbLinks = await this.db("links")
      .where(query)
      .select("links._id", "links.link_type", "files._url_path")
      .rightJoin("files", `links.${joinKey}`, "=", "files._id");

    const links = dbLinks.map((link) => new Link(link));
    return links;
  }

  // TODO better name? move to File?
  async query(query?: DatabaseQuery): Promise<File[]> {
    const { filetypes, tags, extensions } = query || {};

    const files = await this.db
      // TODO join only if tags are specified
      .leftJoin("file_tags", "files._id", "file_tags.file")
      .where((builder) => {
        // if (path) {
        //   builder.whereLike("_url_path", `${folder}/%`);
        // }
        // if (urlPath) {
        //   builder.where("_url_path", urlPath);
        // }

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

  _destroyDb() {
    this.db.destroy();
  }
}

export interface GetLinksOptions {
  fileId: string;
  linkType?: "normal" | "embed";
  direction?: "forward" | "backward";
}
