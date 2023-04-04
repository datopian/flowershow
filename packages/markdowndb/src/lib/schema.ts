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

/*
 * Schema
 */
export interface FileSerialized extends Omit<File, "metadata"> {
  metadata: string | null;
}

class File {
  static table = Table.Files;
  static supportedExtensions = ["md", "mdx"];

  _id: string;
  file_path: string;
  url_path: string;
  metadata: MetaData | null;
  extension: string;
  filetype: string | null;

  constructor(dbFile: FileSerialized) {
    this._id = dbFile._id;
    this.file_path = dbFile.file_path;
    this.url_path = dbFile.url_path;
    this.metadata = dbFile.metadata ? JSON.parse(dbFile.metadata) : null;
    this.extension = dbFile.extension;
    this.filetype = dbFile.filetype;
  }

  static async createTable(db: Knex) {
    const creator = (table: Knex.TableBuilder) => {
      table.string("_id").primary();
      table.string("file_path").unique().notNullable(); // Path relative to process.cwd()
      table.string("url_path").unique().notNullable(); // Sluggfied path
      table.string("metadata").notNullable(); // All frontmatter data
      table.string("extension").notNullable(); // File extension
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

  // _id: string;
  link_type: "normal" | "embed";
  from: string;
  to: string;

  constructor(dbLink: {
    // _id: string;
    link_type: "normal" | "embed";
    from: string;
    to: string;
  }) {
    // this._id = dbLink._id;
    this.link_type = dbLink.link_type;
    this.from = dbLink.from;
    this.to = dbLink.to;
  }

  static async createTable(db: Knex) {
    const creator = (table: Knex.TableBuilder) => {
      // table.string("_id").primary();
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

  static batchInsert(db: Knex, links: Link[]) {
    return db.batchInsert(Table.Links, links);
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

      // TODO this is now saved as tag name, not as tag id ...
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
