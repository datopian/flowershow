import { allBlogs } from "contentlayer/generated";

export default function getBlogs() {
  return allBlogs.sort((a, b) => new Date(b.created) - new Date(a.created));
}
