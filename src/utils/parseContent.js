const fs = require("fs");
const path = require("path");

function parseFilePaths(directory) {
  const filePaths = [];

  const traverseDir = (currentDir) => {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.posix.join(currentDir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        traverseDir(filePath);
      } else {
        const relativePath = path.posix.relative(
          directory,
          filePath
        );

        if (path.extname(filePath) === ".md") {
          filePaths.push({
            language: file.split(".")[0],
            relativePath,
            path: filePath,
          });
        }
      }
    }
  };

  traverseDir(directory);
  return filePaths;
}

const dirPath = path.join(__dirname, "../content");
const filePaths = parseFilePaths(dirPath);

const result = {};
for (const filePath of filePaths) {
  const { language, relativePath, path } = filePath;

  const dirs = relativePath.split("/");
  const title = dirs.at(-2);
  const ds = dirs.at(-3).toLowerCase();

  const slug = ds.toLowerCase() + "/" + title.toLowerCase().replace(/[^\w-]+/g, "");

  const fileContent = fs.readFileSync(path, "utf-8");

  const parsedMethodsSet = new Set();

  const regex = /\b([A-Z][a-zA-Z0-9]*)\s*\(/g;
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    parsedMethodsSet.add(match[1]);
  }

  const parsedMethodsArr = Array.from(parsedMethodsSet)
    .filter(method => !/\./.test(method));

  if (!(language in result)) result[language] = {};
  if (!(ds in result[language])) result[language][ds] = {};
  result[language][ds][slug] = {};
  result[language][ds][slug]["content"] = fileContent;
  result[language][ds][slug]["parsedMethods"] = parsedMethodsArr;

  if (!("metadata" in result[language][ds][slug])) {
    const metadataJsonPath = path.split("/").slice(0, -1);
    metadataJsonPath.push("metadata.json");
    const fileContent = fs.readFileSync(metadataJsonPath.join("/"), "utf-8");
    const metadataJson = JSON.parse(fileContent);
    metadataJson.title = title;
    metadataJson.slug = slug;
    result[language][ds][slug] = {
      ...result[language][ds][slug],
      ...metadataJson
    };
  }
}

const jsonFilePath = path.join(__dirname, "../content/data.json");
const jsonString = JSON.stringify(result, null, 2);

fs.writeFileSync(jsonFilePath, jsonString);
