#!/usr/bin/env node

import { findTestFiles } from './fileLoad';
import path from 'path';

// find all files that end with `.kj.ts` in the current directory
const basePath = path.resolve(__dirname, './');
const testFiles = findTestFiles(basePath, /\.ks\.(ts|js)$/);
console.log(testFiles);

// execute all test files
testFiles.forEach((file) => {
  const absolutePath = path.resolve(file);
  require(absolutePath);
});
