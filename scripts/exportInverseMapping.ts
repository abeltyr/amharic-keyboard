import fs from "fs";
import path from "path";
import { inverseWords } from "../src/data/inverseMapping";
import { words } from "../src/data/final";

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Convert the inverseWords object to a formatted JSON string
const jsonContent = JSON.stringify(words, null, 2);

// Write the JSON string to a file
const outputPath = path.join(dataDir, "en-am.json");
fs.writeFileSync(outputPath, jsonContent, "utf8");

console.log(`Inverse mapping saved to ${outputPath}`);
