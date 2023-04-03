import * as crypto from "crypto";
import * as fs from "fs";
import knex, { Knex } from "knex";
// TODO temporary here
import remarkWikiLink from "@flowershow/remark-wiki-link";

import { recursiveWalkDir, extractWikiLinks } from "../utils";
import { File, Link, Tag, FileTag, Table } from "./schema";

import { DatabaseFile, DatabaseQuery } from "./types";

// config to extractWikiLinks utility
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

const extractLinks = (source: string, filePath: string, fileId: string) => {
  let links = [];

  // TODO pass this config as an argument, so that e.g. wikiLink doesn't have to bea dependency as it shouldnt

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
    filePath: tempSluggify(`/${filePath}`),
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
      from: fileId,
      to: link.to,
      link_type: link.linkType,
    };
  });

  return links;
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

  async init() {
    this.db = knex(this.config);
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
    await this.#deleteTable(Table.Files);
    await this.#deleteTable(Table.Tags);
    await this.#deleteTable(Table.FileTags);
    await this.#deleteTable(Table.Links);

    await this.#createTable(Table.Files, File.tableCreator);
    await this.#createTable(Table.Tags, Tag.tableCreator);
    await this.#createTable(Table.FileTags, FileTag.tableCreator);
    await this.#createTable(Table.Links, Link.tableCreator);

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

    await this.db.batchInsert("files", filesToInsert);
    // TODO  what happens if some of the files were not inserted?
    // I guess inserting tags or links with such files used as foreign keys will fail too,
    // but need to check
    await this.db.batchInsert("tags", tagsToInsert);
    await this.db.batchInsert("file_tags", fileTagsToInsert);

    // const destPath = to.replace(/^\//, "");
    // // find the file with the same url path
    // const destFile = await this.db("files")
    //   .where({ _url_path: destPath })
    //   .first();

    // linksToInsert.push({
    //   ...link,
    //   to: destFile?._id,
    // });

    // await this.db.batchInsert("links", linksToInsert);
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
