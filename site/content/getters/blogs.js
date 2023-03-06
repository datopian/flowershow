import { allBlogs } from "contentlayer/generated";

export default function getBlogs() {
  return allBlogs
    .map(({ title, description = null, date, url_path }) => ({
      title,
      description,
      date,
      url_path,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
