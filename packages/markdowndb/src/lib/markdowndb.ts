import * as fs from "fs";
import knex, { Knex } from "knex";

import { recursiveWalkDir } from "../utils";
import { File, Link, Tag, FileTag, Table } from "./schema";

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

  // async #createTable(
  //   table: string,
  //   creator: (table: Knex.CreateTableBuilder) => void
  // ) {
  //   const tableExists = await this.db.schema.hasTable(table);

  //   if (!tableExists) {
  //     await this.db.schema.createTable(table, creator);
  //   }
  // }

  // async #deleteTable(table: string) {
  //   await this.db.schema.dropTableIfExists(table);
  // }

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
      if (ignorePatterns.some((pattern) => pattern.test(filePath))) {
        continue;
      }

      let serializedFile = null;

      const source: string = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });

      try {
        serializedFile = File.parse({ filePath, folderPath, source });
      } catch (e) {
        console.log(
          `MarkdownDB Error: Failed to parse '${filePath}'. Skipping...\n${e}`
        );
        continue;
      }

      // TAGS
      let { tags = [] } = serializedFile.metadata || {};
      tags.forEach((tag: string) => {
        if (!tagsToInsert.some((t) => t.name === tag)) {
          tagsToInsert.push({ name: tag });
        }
        fileTagsToInsert.push({ file: serializedFile._id, tag });
      });

      // LINKS
      let links = extractLinks(source, filePath, serializedFile._id);
      fileLinksToInsert[serializedFile._id] = links;

      filesToInsert.push(serializedFile);
    }

    console.log("filesToInsert", filesToInsert);

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
          // file.tags = file.tags?.split(",") || [];
          // console.log("metadata", file.metadata);
          // file.metadata = JSON.parse(file.metadata);

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

export interface GetLinksOptions {
  fileId: string;
  linkType?: "normal" | "embed";
  direction?: "forward" | "backward";
}
