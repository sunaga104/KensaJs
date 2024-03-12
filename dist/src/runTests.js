#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const findTestFiles_1 = require("./infrastructure/file/findTestFiles");
const message_1 = require("./infrastructure/log/message");
const libraryCheck_1 = require("./infrastructure/utils/libraryCheck");
const tsNodeAvailable = (0, libraryCheck_1.tsNodeCheck)();
const basePath = process.argv[2]
    ? path_1.default.resolve(process.argv[2])
    : process.cwd();
console.log(`Searching for .ks.(ts|js) files in: ${basePath}`);
const filePattern = tsNodeAvailable ? /\.ks\.(ts|js)$/ : /\.ks\.js$/;
const testFiles = (0, findTestFiles_1.findTestFiles)(basePath, filePattern);
console.log(testFiles);
(0, message_1.displayStartMsg)();
for (let index = 0; index < testFiles.length; index++) {
    const file = testFiles[index];
    try {
        const test = require(file);
    }
    catch (error) {
        console.error(`Failed to import ${file}`, error);
    }
}
//# sourceMappingURL=runTests.js.map