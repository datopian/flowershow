import sitemap from "./sitemap.mjs";
import search from "./search.mjs";
import mddb from "./mddb.mjs";
import generateCanvas from "./canvas.mjs";

await mddb();
await Promise.all([sitemap(), search(), generateCanvas()]);

process.exit();
