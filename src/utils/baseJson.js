import fs from "fs";
import path from "path";

export function getBaseJson(fileName) {
  const filePath = path.resolve(process.cwd(), "src",
    "utils",
    "data",
    fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}