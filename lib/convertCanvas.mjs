import path from "path";
import * as fs from "fs";

function mapColor(color) {
    const colors = {
        0: "#7e7e7e",
        1: "#aa363d",
        2: "#a56c3a",
        3: "#aba960",
        4: "#199e5c",
        5: "#249391",
        6: "#795fac",
    };
    let appliedColor = colors[0];

    if (color && 0 < color.length && color.length < 2) {
        appliedColor = colors[color];
    }
    if (color && 1 < color.length) {
        appliedColor = color;
    }
    return appliedColor;
}

function renderNode(node) {
    const strockWidth = 4;
    const fontWeight = "bold";
    const fontFamily = "Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

    let textOffsetX = 15;
    let textOffsetY = 0;
    let fontColor = "#2c2d2c";
    let fontSize = 15;
    let content = "";

    // Render default text

    if (node["text"]) {
        content = `
      <style>
          p {
              font-family: ${fontFamily};
              font-size: ${fontSize}px;
              color: ${fontColor};
          }
      </style>
      <foreignObject x="${node["x"] + textOffsetX}" y="${node["y"] + textOffsetY
            }" width="${node["width"] - textOffsetX * 2}" height="${node["height"] - textOffsetY * 2
            }">
      <p xmlns="http://www.w3.org/1999/xhtml" class="${node["id"]}">${node["text"]
            }</p>
      </foreignObject>
      `;
    }

    // Render multiline text
    if (node["text"] && node["text"].split("\n").length > 1) {
        let spans = "";
        for (const line of node["text"].split("\n")) {
            spans += `<tspan x="${node["x"] + textOffsetX}" dy="${fontSize + 3
                }">${line}</tspan>`;
        }
        textOffsetY = 10;
        content = `<text x="${node["x"] + textOffsetX}" y="${node["y"] + textOffsetY
            }" font-family="${fontFamily}" fill="${fontColor}">${spans}</text>`;
    }

    try {
        if (node["file"] && node["file"].endsWith(".md")) {
            const title = node["file"].replace(".md", "");
            const text = `<a href="/content/${title.toLowerCase()}.md">${title}</a>`;
            fontColor = "#9a7fee";
            fontSize = 28;
            textOffsetX = 30;
            textOffsetY = 45;
            content = `<text x="${node["x"] + textOffsetX}" y="${node["y"] + textOffsetY
                }" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fontColor}">${text}</text>`;
        }
    } catch (error) {
        console.error("Error in processing markdown file:", error);
        content = ""
    }

    try {
        // Render image
        if (node["file"] && !node["file"].endsWith(".md")) {
            const filePath = node["file"];
            const base64_content = fs.readFileSync(
                `${process.cwd()}\\content\\${filePath}`,
                "base64"
            );
            const extension = path.extname(filePath).replace(".", "");
            content = `<image href="${`data:image/${extension};base64,${base64_content}`}" x="${node["x"]
                }" y="${node["y"]}" width="${node["width"]}" height="${node["height"]
                }" clip-path="inset(0% round 15px)" />`;
            fontColor = "#9a7fee";
        }
    } catch (error) {
        console.error("Error in processing image file:", error);
        content = ""
    }

    return `
  <rect x="${node["x"]}" y="${node["y"]}" width="${node["width"]}" height="${node["height"]
        }" rx="15" stroke="${mapColor(
            node["color"]
        )}" stroke-width="${strockWidth}" fill="none"/>
  ${content}
  `;
}

function renderGroup(group) {
    const strockWidth = 4;
    const fontWeight = "bold";
    const fontFamily = "Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

    let textOffsetX = 15;
    let textOffsetY = -15;
    let fontColor = "#2c2d2c";
    let fillColor = "#fbfbfb";
    let text = group["label"];
    let fontSize = 24;

    return `
  <rect x="${group["x"]}" y="${group["y"]}" width="${group["width"]}" height="${group["height"]
        }" rx="30" stroke="${mapColor(
            group["color"]
        )}" stroke-width="${strockWidth}" fill="${fillColor}"/>
  <text x="${group["x"] + textOffsetX}" y="${group["y"] + textOffsetY
        }" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fontColor}">${text}</text>
  `;
}

function renderEdge(edge) {
    const id = edge["id"];
    const strockWidth = 5;
    const color = mapColor(edge["color"]);
    const fromSide = edge["fromSide"];
    const toSide = edge["toSide"];
    const fontFamily = "Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";
    const fontColor = "#2c2d2c";

    let marker = `marker-end="url(#arrow-end-${id})"`;
    let fromOffset = 1;
    let toOffset = 11;
    let fromX = edge["fromX"];
    let fromY = edge["fromY"];
    let toX = edge["toX"];
    let toY = edge["toY"];
    let label = "";

    // Set arrow marker

    if (edge["fromEnd"] === "arrow") {
        marker = `marker-end="url(#arrow-end-${id})" marker-start="url(#arrow-start-${id})"`;
        fromOffset = 11;
    }
    if (edge["toEnd"] === "none") {
        marker = "";
        toOffset = 1;
    }

    // Calculate position with offset

    if (fromSide === "right") {
        fromX += fromOffset;
    }
    if (fromSide === "bottom") {
        fromY += fromOffset;
    }
    if (fromSide === "left") {
        fromX -= fromOffset;
    }
    if (fromSide === "top") {
        fromY -= fromOffset;
    }
    if (toSide === "right") {
        toX += toOffset;
    }
    if (toSide === "bottom") {
        toY += toOffset;
    }
    if (toSide === "left") {
        toX -= toOffset;
    }
    if (toSide === "top") {
        toY -= toOffset;
    }

    // Add label if is set

    if (edge["label"]) {
        // Calculate position with offset
        let labelLength = edge["label"].length * 4;
        let labelX = fromX - labelLength;
        let labelY = fromY;

        if (toX > fromX) {
            labelX += Math.abs((fromX - toX) / 2);
        }
        if (toY > fromY) {
            labelY += Math.abs((fromY - toY) / 2);
        }
        if (toX < fromX) {
            labelX -= Math.abs((toX - fromY) / 2);
        }
        if (toY < fromY) {
            labelY -= Math.abs((toY - fromY) / 2);
        }

        const content = `<text x="${labelX}" y="${labelY}" font-family="${fontFamily}" fill="${fontColor}">${edge["label"]}</text>`;
        label = content;
    }

    return `
  <marker xmlns="http://www.w3.org/2000/svg" id="arrow-end-${id}" viewBox="0 0 10 10" refX="1" refY="5" fill="${color}" markerUnits="strokeWidth" markerWidth="3" markerHeight="3" orient="auto">
      <path d="M 0 0 L 7 5 L 0 10 z"/>
  </marker>
  <marker xmlns="http://www.w3.org/2000/svg" id="arrow-start-${id}" viewBox="-10 -10 10 10" refX="-1" refY="-5" fill="${color}" markerUnits="strokeWidth" markerWidth="3" markerHeight="3" orient="auto">
      <path d="M 0 0 L -7 -5 L -0 -10 z"/>
  </marker>
  <line x1="${fromX}" y1="${fromY}" x2="${toX}" y2="${toY}" stroke="${color}" stroke-width="${strockWidth}" ${marker} />
  ${label}
  `;
}

function convertCanvasToSVG(content) {
    const nodes = content["nodes"];
    const edges = content["edges"];

    let svg = "";

    let minX = 0;
    let minY = 0;

    for (const node of nodes) {
        const nodeX = node["x"];
        const nodeY = node["y"];
        const nodeWith = node["width"];
        const nodeHeight = node["height"];

        if (nodeX < minX) {
            minX = nodeX;
        }
        if (nodeY < minY) {
            minY = nodeY;
        }
    }

    // Caclulate view box size

    let width = 0;
    let height = 0;

    for (const node of nodes) {
        const nodeX = node["x"];
        const nodeY = node["y"];
        const nodeWith = node["width"];
        const nodeHeight = node["height"];

        const nodeMaxX = Math.abs(nodeX - minX) + nodeWith;
        if (width < nodeMaxX) {
            width = nodeMaxX;
        }
        const nodeMaxY = Math.abs(nodeY - minY) + nodeHeight;
        if (height < nodeMaxY) {
            height = nodeMaxY;
        }
    }

    // Add view box

    const spacing = 50;

    svg += `<svg viewBox="${minX - spacing} ${minY - spacing} ${width + spacing * 2
        } ${height + spacing * 2}" xmlns="http://www.w3.org/2000/svg">\n `;

    // Render group as rect

    for (const group of nodes.filter((node) => node["type"] === "group")) {
        svg += renderGroup(group);
    }

    for (const edge of edges) {
        const fromSide = edge["fromSide"];
        const toSide = edge["toSide"];
        let fromX = 0;
        let fromY = 0;
        let toX = 0;
        let toY = 0;

        // Get start and target nodes

        const fromNode = nodes.filter((node) => node["id"] === edge["fromNode"])[0];
        const toNode = nodes.filter((node) => node["id"] === edge["toNode"])[0];

        // Calculate x and y position of arrow start

        if (fromSide === "right") {
            fromX = fromNode["x"] + fromNode["width"];
            fromY = fromNode["y"] + fromNode["height"] / 2;
        }
        if (fromSide === "bottom") {
            fromX = fromNode["x"] + fromNode["width"] / 2;
            fromY = fromNode["y"] + fromNode["height"];
        }
        if (fromSide === "left") {
            fromX = fromNode["x"];
            fromY = fromNode["y"] + fromNode["height"] / 2;
        }
        if (fromSide === "top") {
            fromX = fromNode["x"] + fromNode["width"] / 2;
            fromY = fromNode["y"];
        }
        edge["fromX"] = fromX;
        edge["fromY"] = fromY;

        // Calculate x and y position of arrow target

        if (toSide === "right") {
            toX = toNode["x"] + toNode["width"];
            toY = toNode["y"] + toNode["height"] / 2;
        }
        if (toSide === "bottom") {
            toX = toNode["x"] + toNode["width"] / 2;
            toY = toNode["y"] + toNode["height"];
        }
        if (toSide === "left") {
            toX = toNode["x"];
            toY = toNode["y"] + toNode["height"] / 2;
        }
        if (toSide === "top") {
            toX = toNode["x"] + toNode["width"] / 2;
            toY = toNode["y"];
        }
        edge["toX"] = toX;
        edge["toY"] = toY;

        svg += renderEdge(edge);
    }

    // Render nodes as rect

    for (const node of nodes.filter((node) =>
        ["text", "file"].includes(node["type"])
    )) {
        svg += renderNode(node);
    }

    svg += "</svg>";

    return svg;
}

export function changeExtension(filePath) {
    const strArray = filePath.split("\\");
    const str = strArray[strArray.length - 1].replace(".canvas", ".svg");
    return str.toLocaleLowerCase().replace(" ", "-");
}

export default convertCanvasToSVG;
