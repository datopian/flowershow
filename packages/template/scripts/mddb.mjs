// TODO temporary (?) file, cuz mddb command of @flowershow/markdowndb wouldn't work on Netlify

import clientPromise from "../lib/mddb.mjs";

export default async function mddb() {
  const ignorePatterns = [/Excalidraw/, /.obsidian/, /DS_Store/];

  const mddb = await clientPromise;

  await mddb.indexFolder({
    folderPath: "./content",
    ignorePatterns: ignorePatterns,
  });

  return;
}
