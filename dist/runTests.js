#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
// find all files that end with `.ks.ts` or `.ks.js` in the current directory
const basePath = process.argv[2]
    ? path_1.default.resolve(process.argv[2])
    : process.cwd();
console.log(`Searching for .ks.(js) files in: ${basePath}`);
const testFiles = findTestFiles(basePath, /\.ks\.(js)$/);
console.log(testFiles);
// execute all test files
// (async () => {
//   for (const file of testFiles) {
//     try {
//       console.log(`Importing test file: ${file}`);
//       const url = pathToFileURL(file); // convert path to file:// URL
//       await import(url.href);
//     } catch (error) {
//       console.error(`Failed to import ${file}`, error);
//     }
//   }
// })();
testFiles.forEach((file) => {
    try {
        console.log(`Importing test file: ${file}`);
        require(file); // Use require to load and execute the JS file
    }
    catch (error) {
        console.error(`Failed to import ${file}`, error);
    }
});
/**
 * find all files in a directory that match a pattern
 * @param dir target directory
 * @param pattern regex pattern to match
 * @returns
 */
function findTestFiles(dir, pattern) {
    let results = [];
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path_1.default.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(findTestFiles(fullPath, pattern));
        }
        else if (pattern.test(file)) {
            results.push(fullPath);
        }
    });
    return results;
}
//# sourceMappingURL=runTests.js.map