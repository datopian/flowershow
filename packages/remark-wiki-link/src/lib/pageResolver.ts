import { isEmbeddedFileLink } from "./isEmbeddedFileLink";

const slugify = (name: string): string => {
  return name.replace(/ /g, "-").toLowerCase();
};

export const pageResolver =
  (permalinks?: Array<string>) =>
  (path: string): string => {
    // for file embed links return the original path (e.g. e.g. ../../Assets/Image 1.png)
    if (isEmbeddedFileLink(path)[0]) {
      return path;
    }

    // for other links
    const slugifiedPath = slugify(path);

    if (!permalinks) {
      return slugifiedPath;
    }

    const pathWithOptionalHeadingPattern = /([a-z0-9./_-]*)(#.*)?/;
    const [fullPath, permalink, heading] = slugifiedPath.match(
      pathWithOptionalHeadingPattern
    );

    const matchedPermalink = permalinks.find(
      (p) => p === permalink || p.endsWith(permalink)
    );

    return matchedPermalink ? `${matchedPermalink}${heading ?? ""}` : fullPath;
  };
