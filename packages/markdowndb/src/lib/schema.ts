import { Knex } from "knex";

type MetaData = {
  [key: string]: string | number | boolean | null | any[];
};

class File {
  _id: string;
  _path: string;
  _url_path: string;
  metadata: MetaData;
  extension: string;
  filetype: string; // TODO

  constructor(dbFile: {
    _id: string;
    _path: string;
    _url_path: string;
    metadata: MetaData;
    extension: string;
    filetype: string;
  }) {
    this._id = dbFile._id;
    this._path = dbFile._path;
    this._url_path = dbFile._url_path;
    this.metadata = dbFile.metadata;
    this.extension = dbFile.extension;
    this.filetype = dbFile.filetype;
  }

  static get tableCreator() {
    return (table: Knex.TableBuilder) => {
      table.string("_id").primary();
      table.string("_path").unique().notNullable(); //  Can be used to read a file
      table.string("_url_path").unique(); //  Can be used to query by folder
      table.string("metadata");
      table.string("extension").notNullable();
      // table.enu("fileclass", ["text", "image", "data"]).notNullable();
      table.string("type"); // type field in frontmatter if it exists
    };
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

  get isEmbed() {
    return this.linkType === "embed";
  }

  get path() {
    return this.path;
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
