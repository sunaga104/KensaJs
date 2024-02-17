#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const findTestFiles_1 = require("./findTestFiles");
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
// run all tests
const runTests = async (testFiles) => {
    for (let index = 0; index < testFiles.length; index++) {
        const file = testFiles[index];
        console.log();
        console.log('***************************************************************');
        console.log(`test file: ${file}`);
        console.log();
        console.log('***************************************************************');
        try {
            const test = require(file);
            let filstFlg = true;
            for (const key in test) {
                if (filstFlg) {
                    filstFlg = false;
                }
                else {
                    console.log();
                    console.log('------------------------------------------');
                }
                await test[key]();
            }
        }
        catch (error) {
            console.error(`Failed to import ${file}`, error);
        }
    }
};
runTests(testFiles);
//# sourceMappingURL=runTests.js.map