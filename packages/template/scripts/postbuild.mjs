import sitemap from "./sitemap.mjs";
import search from "./search.mjs";

await Promise.all([sitemap(), search()]);

process.exit();
