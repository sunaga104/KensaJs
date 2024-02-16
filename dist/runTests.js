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
let tsNodeAvailable = false;
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
const testFiles = findTestFiles(basePath, filePattern);
console.log(testFiles);
testFiles.forEach((file, index) => {
    if (index > 0) {
        console.log(); // 空行を出力
    }
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