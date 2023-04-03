import { Knex } from "knex";
import matter from "gray-matter";
import * as crypto from "crypto";
import * as path from "path";

/*
 * Types
 */
export enum Table {
  Files = "files",
  Tags = "tags",
  FileTags = "file_tags",
  Links = "links",
}

type MetaData = {
  [key: string]: any;
};

export interface FileSerialized {
  _id: string;
  _path: string;
  _url_path: string;
  metadata: string;
  extension: string;
  filetype: string;
}

/*
 * Schema
 */
class File {
  static supportedExtensions = ["md", "mdx"];
  _id: string;
  _path: string;
  _url_path: string;
  metadata: MetaData;
  extension: string;
  filetype: string; // TODO

  constructor(dbFile: FileSerialized) {
    this._id = dbFile._id;
    this._path = dbFile._path;
    this._url_path = dbFile._url_path;
    this.metadata = JSON.parse(dbFile.metadata);
    this.extension = dbFile.extension;
    this.filetype = dbFile.filetype;
  }

  static get tableCreator() {
    return (table: Knex.TableBuilder) => {
      table.string("_id").primary();
      table.string("_path").unique().notNullable(); //  Can be used to read a file
      table.string("_url_path").unique(); //  Can be used to query by folder
      // table.string("_relative_path").unique(); //  Can be used to query by folder
      table.string("metadata");
      table.string("extension").notNullable();
      // table.enu("fileclass", ["text", "image", "data"]).notNullable();
      table.string("filetype"); // type field in frontmatter if it exists
    };
  }

  // TODO return type
  static parse({
    filePath,
    folderPath,
    source,
  }: {
    filePath: string;
    folderPath: string;
    source: string;
  }) {
    const serializedFile = {
      _id: null,
      _path: null,
      _url_path: null,
      extension: null,
      metadata: null,
      filetype: null,
    };

    // EXTENSION
    const [, extension] = filePath.match(/.(\w+)$/) || [];
    if (!File.supportedExtensions.includes(extension)) {
      console.error("Unsupported file extension: ", extension);
    }
    serializedFile.extension = extension;

    // ID
    const encodedPath = Buffer.from(filePath, "utf-8").toString();
    const id = crypto.createHash("sha1").update(encodedPath).digest("hex");
    serializedFile._id = id;

    // METADATA
    const { data } = matter(source);
    serializedFile.metadata = data;

    // FILETYPE
    serializedFile.filetype = data.type || null;

    // _PATH
    serializedFile._path = filePath;

    // _URL_PATH
    const pathRelativeToFolder = path.relative(folderPath, filePath);
    serializedFile._url_path = pathRelativeToFolder;

    // SLUGGIFY
    // if (filename != "index") {
    //   if (pathToFileFolder) {
    //     _url_path = `${pathToFileFolder}/${filename}`;
    //   } else {
    //     //  The file is in the root folder
    //     _url_path = filename;
    //   }
    // } else {
    //   _url_path = pathToFileFolder;
    // }
    return serializedFile;
  }
}

class Link {
  _id: string;
  url: string;
  linkType: "normal" | "embed";

  constructor(dbLink: {
    _id: string;
    _url_path: string;
    link_type: "normal" | "embed";
  }) {
    this._id = dbLink._id;
    this.url = dbLink._url_path;
    this.linkType = dbLink.link_type;
  }

  static get tableCreator() {
    return (table: Knex.TableBuilder) => {
      table.string("_id").primary();
      table.enum("link_type", ["normal", "embed"]).notNullable();
      table.string("from").notNullable();
      table.string("to").notNullable();
      table.foreign("from").references("files._id").onDelete("CASCADE");
      table.foreign("to").references("files._id").onDelete("CASCADE");
    };
  }
}

class Tag {
  name: string;
  // description: string;

  constructor(dbTag: {
    name: string;
    // description: string;
  }) {
    this.name = dbTag.name;
    // this.description = dbTag.description;
  }

  static get tableCreator() {
    return (table: Knex.TableBuilder) => {
      table.string("name").primary();
      // table.string("description");
    };
  }
}

class FileTag {
  // _id: string;
  tag: string;
  file: string;

  constructor(dbFileTag: { tag: string; file: string }) {
    this.tag = dbFileTag.tag;
    this.file = dbFileTag.file;
  }

  static get tableCreator() {
    return (table: Knex.TableBuilder) => {
      table.string("tag").notNullable();
      table.string("file").notNullable();

      table.foreign("tag").references("tags.name").onDelete("CASCADE");
      table.foreign("file").references("files._id").onDelete("CASCADE");
    };
  }
}

export { File, Link, Tag, FileTag };

// class filetag {
//   _id: string;
//   file_id: string;
//   tag_name: string;

//   constructor(dbfiletag: {
//     _id: string;
//     file_id: string;
//     tag_name: string;
//   }) {
//     this._id = dbfiletag._id;
//     this.file_id = dbfiletag.file_id;
//     this.tag_name = dbfiletag.tag_name;
//   }

//   static get tablecreator() {
//     return (table: knex.tablebuilder) => {
//       table.string("_id").primary();
//       table.string("file_id").notnullable();
//       table.string("tag_name").notnullable();
//       table.foreign("file_id").references("files._id").ondelete("cascade");
//       table.foreign("tag_name").references("tags.name").ondelete("cascade");
//     }
//   }
// }
