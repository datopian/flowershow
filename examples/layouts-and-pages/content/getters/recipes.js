import { allRecipes } from "contentlayer/generated";

export default function getRecipes() {
  return allRecipes
    .map(({ title, description, created, url_path }) => ({
      title,
      description,
      created,
      url_path,
    }))
    .sort((a, b) => new Date(b.created) - new Date(a.created));
}
