#!/usr/bin/env node
import path from 'path';
import * as fs from 'fs';
import { findTestFiles } from './findTestFiles';
import {
  allKsTestResultMsg,
  allResultMsg,
  decoratLine,
  decoratLine3,
  space,
  splitLine,
} from './message';
import { logStyle } from './style';

let tsNodeAvailable = false;

// check if ts-node is available
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
logStyle(' start tests ').bgBlue().white().bold().log();
space();
space();
space();
// run all tests
const runTests = async (testFiles: string[]) => {
  let allTestResult = true;
  let allSuccessCount = 0;
  let allFailureCount = 0;
  let allTotalCount = testFiles.length;
  for (let index = 0; index < testFiles.length; index++) {
    const file = testFiles[index];
    space();
    console.log(file);
    logStyle(decoratLine()).bold().log();
    try {
      const test = require(file);
      let testResult = true;
      let successCount = 0;
      let failureCount = 0;
      let totalCount = 0;
      let firstTest = true;
      for (const key in test) {
        if (firstTest) {
          firstTest = false;
        } else {
          splitLine();
        }
        const result = await test[key]();
        if (result) {
          successCount++;
        } else {
          failureCount++;
          testResult = false;
        }
        totalCount++;
      }
      if (testResult) {
        allSuccessCount++;
      } else {
        allFailureCount++;
        allTestResult = false;
      }
      allResultMsg(totalCount, successCount, failureCount);
    } catch (error) {
      console.error(`Failed to import ${file}`, error);
      allFailureCount++;
    }
    space();
    space();
  }
  allKsTestResultMsg(allTotalCount, allSuccessCount, allFailureCount);
};

runTests(testFiles);
