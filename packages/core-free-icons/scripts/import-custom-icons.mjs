import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "svgson";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(__dirname, "..");

const svgDir = path.join(packageDir, "custom-icons");
const srcDir = path.join(packageDir, "src");
const indexPath = path.join(srcDir, "index.ts");

const attributeMap = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
};

const supportedTags = new Set([
  "path",
  "circle",
  "rect",
  "line",
  "ellipse",
  "polygon",
  "polyline",
]);

function toPascalCase(value) {
  return value
    .replace(/\.svg$/i, "")
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, char) =>
      char ? char.toUpperCase() : "",
    )
    .replace(/^[^a-zA-Z]+/, "");
}

function serialize(value) {
  return JSON.stringify(value);
}

function convertNode(node, result) {
  if (!supportedTags.has(node.name)) {
    throw new Error(
      `Unsupported SVG element <${node.name}>. ` +
        `This script currently supports: ${[...supportedTags].join(", ")}.`,
    );
  }

  const attributes = {};

  for (const [originalName, originalValue] of Object.entries(
    node.attributes ?? {},
  )) {
    if (
      originalName === "xmlns" ||
      originalName === "class" ||
      originalName === "id"
    ) {
      continue;
    }

    const name = attributeMap[originalName] ?? originalName;
    attributes[name] = originalValue;
  }

  attributes.key = String(result.length);
  result.push([node.name, attributes]);
}

async function main() {
  const files = (await fs.readdir(svgDir))
    .filter((file) => file.toLowerCase().endsWith(".svg"))
    .sort();

  if (files.length === 0) {
    console.log(`No SVG files found in ${svgDir}`);
    return;
  }

  let indexContent = await fs.readFile(indexPath, "utf8");

  for (const file of files) {
    const iconName = `${toPascalCase(file)}Icon`;

    if (!iconName || iconName === "Icon") {
      throw new Error(`Could not derive an icon name from ${file}`);
    }

    const svg = await fs.readFile(path.join(svgDir, file), "utf8");
    const root = await parse(svg);

    if (root.name !== "svg") {
      throw new Error(`${file} does not have an <svg> root element.`);
    }

    if (root.attributes?.viewBox !== "0 0 24 24") {
      throw new Error(
        `${file} must have viewBox="0 0 24 24" to match Hugeicons defaults.`,
      );
    }

    const paths = [];

    for (const child of root.children ?? []) {
      if (child.type === "text" && !child.value.trim()) continue;
      if (child.type !== "element") continue;
      convertNode(child, paths);
    }

    if (paths.length === 0) {
      throw new Error(`No supported SVG shapes found in ${file}.`);
    }

    const output = [
      "import type { IconSvgObject } from './types';",
      "",
      `const ${iconName}: IconSvgObject = [`,
      ...paths.map(
        ([tag, attrs]) => `  [${serialize(tag)}, ${serialize(attrs)}],`,
      ),
      "];",
      "",
      `export default ${iconName};`,
      "",
    ].join("\n");

    await fs.writeFile(path.join(srcDir, `${iconName}.ts`), output, "utf8");

    const exportLine = `export { default as ${iconName} } from './${iconName}';`;

    if (!indexContent.includes(exportLine)) {
      indexContent += `\n${exportLine}`;
    }

    console.log(`Generated ${iconName}.ts from ${file}`);
  }

  await fs.writeFile(indexPath, indexContent, "utf8");
  console.log("Custom icon exports updated.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
