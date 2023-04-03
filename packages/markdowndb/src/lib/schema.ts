import { Knex } from "knex";

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
  path: string;
  url_path: string;
  metadata: string;
  extension: string;
  filetype: string;
}

/*
 * Schema
 */
class File {
  static table = Table.Files;
  static supportedExtensions = ["md", "mdx"];

  _id: string;
  path: string;
  url_path: string;
  metadata: MetaData;
  extension: string;
  filetype: string; // TODO

  constructor(dbFile: FileSerialized) {
    this._id = dbFile._id;
    this.path = dbFile.path;
    this.url_path = dbFile.url_path;
    this.metadata = JSON.parse(dbFile.metadata);
    this.extension = dbFile.extension;
    this.filetype = dbFile.filetype;
  }

  static async createTable(db: Knex) {
    const creator = (table: Knex.TableBuilder) => {
      table.string("_id").primary();
      table.string("path").unique().notNullable(); //  Can be used to read a file
      table.string("url_path").unique(); //  Can be used to query by folder
      table.string("metadata");
      table.string("extension").notNullable();
      table.string("filetype"); // type field in frontmatter if it exists
    };
    const tableExists = await db.schema.hasTable(this.table);

    if (!tableExists) {
      await db.schema.createTable(this.table, creator);
    }
  }

  static async deleteTable(db: Knex) {
    await db.schema.dropTableIfExists(this.table);
  }

  static batchInsert(db: Knex, files: File[]) {
    const serializedFiles = files.map((file) => {
      return {
        ...file,
        metadata: JSON.stringify(file.metadata),
      };
    });

    return db.batchInsert(Table.Files, serializedFiles);
  }
}

class Link {
  static table = Table.Links;

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

  static async createTable(db: Knex) {
    const creator = (table: Knex.TableBuilder) => {
      table.string("_id").primary();
      table.enum("link_type", ["normal", "embed"]).notNullable();
      table.string("from").notNullable();
      table.string("to").notNullable();
      table.foreign("from").references("files._id").onDelete("CASCADE");
      table.foreign("to").references("files._id").onDelete("CASCADE");
    };
    const tableExists = await db.schema.hasTable(this.table);

    if (!tableExists) {
      await db.schema.createTable(this.table, creator);
    }
  }

  static async deleteTable(db: Knex) {
    await db.schema.dropTableIfExists(this.table);
  }
}

class Tag {
  static table = Table.Tags;

  name: string;
  // description: string;

  constructor(dbTag: {
    name: string;
    // description: string;
  }) {
    this.name = dbTag.name;
    // this.description = dbTag.description;
  }

  static async createTable(db: Knex) {
    const creator = (table: Knex.TableBuilder) => {
      table.string("name").primary();
      // table.string("description");
    };
    const tableExists = await db.schema.hasTable(this.table);

    if (!tableExists) {
      await db.schema.createTable(this.table, creator);
    }
  }

  static async deleteTable(db: Knex) {
    await db.schema.dropTableIfExists(this.table);
  }

  static batchInsert(db: Knex, tags: Tag[]) {
    return db.batchInsert(Table.Tags, tags);
  }
}

class FileTag {
  static table = Table.FileTags;
  // _id: string;
  tag: string;
  file: string;

  constructor(dbFileTag: { tag: string; file: string }) {
    this.tag = dbFileTag.tag;
    this.file = dbFileTag.file;
  }

  static async createTable(db: Knex) {
    const creator = (table: Knex.TableBuilder) => {
      table.string("tag").notNullable();
      table.string("file").notNullable();

      table.foreign("tag").references("tags.name").onDelete("CASCADE");
      table.foreign("file").references("files._id").onDelete("CASCADE");
    };
    const tableExists = await db.schema.hasTable(this.table);

    if (!tableExists) {
      await db.schema.createTable(this.table, creator);
    }
  }

  static async deleteTable(db: Knex) {
    await db.schema.dropTableIfExists(this.table);
  }

  static batchInsert(db: Knex, fileTags: FileTag[]) {
    return db.batchInsert(Table.FileTags, fileTags);
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
