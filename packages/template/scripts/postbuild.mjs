import sitemap from "./sitemap.mjs";
import search from "./search.mjs";

async function postbuild() {
  await Promise.all([sitemap(), search()]);
}

postbuild();
