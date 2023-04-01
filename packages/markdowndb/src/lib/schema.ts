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
