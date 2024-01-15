import clientPromise from "../lib/mddb.mjs";
import convertCanvasToSVG, { changeExtension } from "../lib/convertCanvas.mjs"
import * as fs from "fs"
import * as path from "path"

export default async function generateCanvas() {
    const mddb = await clientPromise
    const canvases = await mddb.getFiles({ extensions: ["canvas"] });
    for (const canvasFile of canvases) {
        const canvas = fs.readFileSync(canvasFile.file_path, {
            encoding: "utf-8",
        });
        const svg = convertCanvasToSVG(JSON.parse(canvas));
        const canvasFilePath = `${process.cwd()}/public/canvasSvgs/${changeExtension(canvasFile.file_path)}`;

        try {
            // Ensure the directory exists, create if not
            const directoryPath = path.dirname(canvasFilePath);
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            // Write the SVG file
            fs.writeFileSync(canvasFilePath, svg);
        } catch (error) {
            console.error("Error in writing SVG file:", error);
        }
    }
}
