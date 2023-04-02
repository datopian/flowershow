import * as fs from "fs";
import * as crypto from "crypto";
import knex, { Knex } from "knex";
import matter from "gray-matter";

import { DatabaseFile, DatabaseQuery } from "./types";
import extractWikiLinks from "../utils/extractWikiLinks";

import remarkWikiLink from "@flowershow/remark-wiki-link";

import { File, Link, Tag, FileTag } from "./schema";
import { recursiveWalkDir } from "./utils";

export enum Table {
  Files = "files",
  Tags = "tags",
  FileTags = "file_tags",
  Links = "links",
}

const createDatabaseFile: (path: string, folderPath: string) => DatabaseFile = (
  path: string,
  folderPath: string
) => {
  const extension = path.split(".").at(-1);

  const encodedPath = Buffer.from(path, "utf-8").toString();
  const id = crypto.createHash("sha1").update(encodedPath).digest("hex");

  let metadata = null;
  let type = null;
  let links = [];

  //  If it's not a md/mdx file, _url_path is just the relative path
  const pathRelativeToFolder = path.slice(folderPath.length + 1);
  let _url_path = pathRelativeToFolder;

  if (["md", "mdx"].includes(extension)) {
    const source = fs.readFileSync(path, { encoding: "utf8", flag: "r" });
    const { data } = matter(source);
    metadata = data || null;
    type = data.type || null;

    // TODO pass this config as an argument, so that e.g. wikiLink doesn't have to be a dependency as it shouldnt
    const extractWikiLinksConfig = {
      remarkPlugins: [remarkWikiLink],
      extractors: {
        wikiLink: (node: any) => {
          // TODO how to get wiki links of embed types in a better way?
          // it should be possible, since we are adding { isType: "embed" } to tokens
          const { href, src } = node.data?.hProperties || {};
          return {
            linkType: (href ? "normal" : "embed") as "normal" | "embed",
            to: href ?? src,
          };
        },
      },
    };

    // temporary function to sluggify file paths
    const tempSluggify = (str: string) => {
      return str
        .replace(/\s+/g, "-")
        .replace(/\.\w+$/, "")
        .toLowerCase();
    };

    links = extractWikiLinks({
      source,
      // TODO pass slug instead of file path as hrefs/srcs are sluggified too
      // (where will we get it from?)
      filePath: tempSluggify(`/${pathRelativeToFolder}`),
      ...extractWikiLinksConfig,
    }).map((link) => {
      const linkEncodedPath = Buffer.from(
        JSON.stringify(link),
        "utf-8"
      ).toString();
      const linkId = crypto
        .createHash("sha1")
        .update(linkEncodedPath)
        .digest("hex");
      return {
        _id: linkId,
        from: id,
        to: link.to,
        link_type: link.linkType,
      };
    });

    const segments = pathRelativeToFolder.split("/");
    const filename = segments.at(-1).split(".")[0];

    const pathToFileFolder = segments.slice(0, -1).join("/");

    if (filename != "index") {
      if (pathToFileFolder) {
        _url_path = `${pathToFileFolder}/${filename}`;
      } else {
        //  The file is in the root folder
        _url_path = filename;
      }
    } else {
      _url_path = pathToFileFolder;
    }
  }

  return {
    _id: id,
    _path: path,
    _url_path, //  Should exist only for MD/MDX files
    extension,
    metadata,
    links,
    type,
  };
};

export interface GetLinksOptions {
  fileId: string;
  linkType?: "normal" | "embed";
  direction?: "forward" | "backward";
}

export class MarkdownDB {
  config: Knex.Config;
  db: Knex;

  constructor(config: Knex.Config) {
    this.config = config;
  }

  async #createTable(
    table: Table,
    creator: (table: Knex.CreateTableBuilder) => void
  ) {
    const tableExists = await this.db.schema.hasTable(table);

    if (!tableExists) {
      await this.db.schema.createTable(table, creator);
    }
  }

  async #deleteTable(table: Table) {
    await this.db.schema.dropTableIfExists(table);
  }

  async init() {
    this.db = knex(this.config);
  }

  async indexFolder({
    folder,
    ignorePatterns,
  }: {
    folder: string;
    ignorePatterns?: RegExp[];
  }) {
    //  Temporary, we don't want to handle updates now
    //  so database is refreshed every time the folder
    //  is indexed
    await this.#deleteTable(Table.Files);
    await this.#deleteTable(Table.Tags);
    await this.#deleteTable(Table.FileTags);
    await this.#deleteTable(Table.Links);

    await this.#createTable(Table.Files, File.tableCreator);
    await this.#createTable(Table.Tags, Tag.tableCreator);
    await this.#createTable(Table.FileTags, FileTag.tableCreator);
    await this.#createTable(Table.Links, Link.tableCreator);

    const pathsToFiles = recursiveWalkDir(folder);

    const filesToInsert = [];
    const tagsToInsert = [];
    const fileTagsToInsert = [];

    const extractedLinks = [];

    for (const pathToFile of pathsToFiles) {
      let file;

      try {
        file = createDatabaseFile(pathToFile, folder);
      } catch (e) {
        console.log(
          `MarkdownDB Error: Failed to parse '${pathToFile}'. Skipping...`
        );
        console.log(e);
        file = null;
      }

      if (file) {
        let isIgnoredByPattern = false;

        if (ignorePatterns) {
          for (const pattern of ignorePatterns) {
            if (pattern.test(file._url_path)) {
              isIgnoredByPattern = true;
            }
          }
        }

        if (!isIgnoredByPattern) {
          //  There are probably better ways of doing this...
          if (["md", "mdx"].includes(file.extension)) {
            const tags = file.metadata?.tags || [];

            for (const tag of tags) {
              if (!tagsToInsert.find((item) => item.name === tag)) {
                tagsToInsert.push({ name: tag });
              }
              fileTagsToInsert.push({ tag, file: file._id });
            }

            //  Sqlite3 does not support JSON fields
            file.metadata = JSON.stringify(file.metadata);
          }

          // TODO temp
          const { links, ...rest } = file;

          extractedLinks.push(...links);
          filesToInsert.push(rest);
        }
      }
    }

    await this.db.batchInsert("files", filesToInsert);
    await this.db.batchInsert("tags", tagsToInsert);
    await this.db.batchInsert("file_tags", fileTagsToInsert);

    const linksToInsert = [];

    for (const link of extractedLinks) {
      const { to } = link;
      const destPath = to.replace(/^\//, "");
      // find the file with the same url path
      const destFile = await this.db("files")
        .where({ _url_path: destPath })
        .first();

      linksToInsert.push({
        ...link,
        to: destFile?._id,
      });
    }

    await this.db.batchInsert("links", linksToInsert);
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

  async query<T = DatabaseFile>(
    query?: DatabaseQuery
  ): Promise<DatabaseFile<T>[]> {
    const files = this.db
      .select("files.*", this.db.raw("GROUP_CONCAT(tag) as tags")) //  Very hackish way to return tags without duplicating rows
      .from<DatabaseFile>("files")
      .leftJoin("file_tags AS ft", "ft.file", "_id")
      .where((builder) => {
        if (query) {
          let folder = query.folder;
          if (folder) {
            if (folder.at(-1) === "/") {
              folder = query.folder.slice(0, -1);
            }

            builder.whereLike("_url_path", `${folder}/%`);
          }

          const tags = query.tags;
          if (tags) {
            builder.whereIn("tag", tags);
          }

          const extensions = query.extensions;
          if (extensions) {
            builder.whereIn("extension", extensions);
          }

          const urlPath = query.urlPath;
          if (urlPath != undefined) {
            builder.where("_url_path", urlPath);
          }
        }
      })
      .groupBy("_id");

    return files.then((files) => {
      return files.map((file) => {
        if (["mdx", "md"].includes(file.extension)) {
          file.tags = file.tags?.split(",") || [];
          file.metadata = JSON.parse(file.metadata);

          return file;
        } else {
          delete file.tags;
        }
        return file;
      });
    });
  }

  _destroyDb() {
    this.db.destroy();
  }
}
