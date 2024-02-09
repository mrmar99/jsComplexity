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
      } else if (path.extname(filePath) === ".md") {
        const relativePath = path.posix.relative(directory, filePath);
        filePaths.push(relativePath);
      }
    }
  }

  traverseDir(directory);
  return filePaths;
}

const dirPath = path.join(__dirname, '../content');
const filePaths = parseFilePaths(dirPath);

const structure = {};
for (const filePath of filePaths) {
  const dirs = filePath.split('/');
  
  let current = structure;
  for (let i = 0; i < dirs.length - 1; i++) {
    const dir = dirs[i];
    current[dir] = current[dir] || {};
    current = current[dir];
  }

  if (!("mdfiles" in current)) current["mdfiles"] = [];
  current["mdfiles"].push(filePath);
}

const jsonFilePath = path.join(__dirname, '../content/contentStructure.json');
const jsonString = JSON.stringify(structure, null, 2);

fs.writeFileSync(jsonFilePath, jsonString);