#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const findTestFiles_1 = require("./findTestFiles");
const message_1 = require("./message");
const style_1 = require("./style");
let tsNodeAvailable = false;
// check if ts-node is available
try {
    require.resolve('ts-node');
    tsNodeAvailable = true;
    require('ts-node').register();
}
catch (error) {
    console.log('`ts-node` is not installed. Proceeding with JavaScript files only.');
}
// find all files that end with `.ks.ts` or `.ks.js` in the current directory
const basePath = process.argv[2]
    ? path_1.default.resolve(process.argv[2])
    : process.cwd();
console.log(`Searching for .ks.(ts|js) files in: ${basePath}`);
const filePattern = tsNodeAvailable ? /\.ks\.(ts|js)$/ : /\.ks\.js$/;
const testFiles = (0, findTestFiles_1.findTestFiles)(basePath, filePattern);
console.log(testFiles);
(0, style_1.logStyle)(' start tests ').bgBlue().white().bold().log();
(0, message_1.space)();
(0, message_1.space)();
(0, message_1.space)();
// run all tests
const runTests = async (testFiles) => {
    let allTestResult = true;
    let allSuccessCount = 0;
    let allFailureCount = 0;
    let allTotalCount = testFiles.length;
    for (let index = 0; index < testFiles.length; index++) {
        const file = testFiles[index];
        (0, message_1.space)();
        console.log(file);
        (0, style_1.logStyle)((0, message_1.decoratLine)()).bold().log();
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
                }
                else {
                    (0, message_1.splitLine)();
                }
                const result = await test[key]();
                if (result) {
                    successCount++;
                }
                else {
                    failureCount++;
                    testResult = false;
                }
                totalCount++;
            }
            if (testResult) {
                allSuccessCount++;
            }
            else {
                allFailureCount++;
                allTestResult = false;
            }
            (0, message_1.allResultMsg)(totalCount, successCount, failureCount);
        }
        catch (error) {
            console.error(`Failed to import ${file}`, error);
            allFailureCount++;
        }
        (0, message_1.space)();
        (0, message_1.space)();
    }
    (0, message_1.allKsTestResultMsg)(allTotalCount, allSuccessCount, allFailureCount);
};
runTests(testFiles);
//# sourceMappingURL=runTests.js.map