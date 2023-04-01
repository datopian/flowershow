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

  // TODO getters
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

  get isEmbed() {
    return this.linkType === "embed";
  }

  get path() {
    return this.path;
  }
}

export { Link };
