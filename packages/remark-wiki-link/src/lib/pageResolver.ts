export const pageResolver = (
  name: string,
  isEmbed: boolean,
  prefix?: string
) => {
  let page = isEmbed
    ? name
    : name
        .replace(/\s+/g, "-")
        .replace(/\/index$/, "")
        .toLowerCase();
  if (prefix) {
    page = `${prefix}${page}`;
  }
  if (page.length === 0) {
    page = "/";
  }
  return [page];
};
