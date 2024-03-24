#!/usr/bin/env node
import path from 'path';
import { findTestFiles } from './infrastructure/file/findTestFiles';
import { displayStartMsg } from './infrastructure/log/message';
import { tsNodeCheck } from './infrastructure/utils/libraryCheck';

const tsNodeAvailable = tsNodeCheck();

const basePath: string = process.argv[2]
  ? path.resolve(process.argv[2])
  : process.cwd();
console.log(`Searching for .ks.(ts|js) files in: ${basePath}`);

const filePattern = tsNodeAvailable ? /\.ks\.(ts|js)$/ : /\.ks\.js$/;
const testFiles = findTestFiles(basePath, filePattern);
console.log(testFiles);

displayStartMsg();

for (let index = 0; index < testFiles.length; index++) {
  const file = testFiles[index];
  try {
    const test = require(file);
  } catch (error) {
    console.error(`Failed to import ${file}`, error);
  }
}
