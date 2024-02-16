#!/usr/bin/env node
import path from 'path';
import * as fs from 'fs';

let tsNodeAvailable = false;
try {
  require.resolve('ts-node');
  tsNodeAvailable = true;
  require('ts-node').register();
} catch (error) {
  console.log(
    '`ts-node` is not installed. Proceeding with JavaScript files only.'
  );
}

// find all files that end with `.ks.ts` or `.ks.js` in the current directory
const basePath: string = process.argv[2]
  ? path.resolve(process.argv[2])
  : process.cwd();
console.log(`Searching for .ks.(ts|js) files in: ${basePath}`);
const filePattern = tsNodeAvailable ? /\.ks\.(ts|js)$/ : /\.ks\.js$/;
const testFiles = findTestFiles(basePath, filePattern);
console.log(testFiles);
testFiles.forEach((file, index) => {
  if (index > 0) {
    console.log(); // 空行を出力
  }
  try {
    console.log(`Importing test file: ${file}`);
    require(file); // Use require to load and execute the JS file
  } catch (error) {
    console.error(`Failed to import ${file}`, error);
  }
});
/**
 * find all files in a directory that match a pattern
 * @param dir target directory
 * @param pattern regex pattern to match
 * @returns
 */
function findTestFiles(dir: string, pattern: RegExp): string[] {
  let results: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(findTestFiles(fullPath, pattern));
    } else if (pattern.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}
