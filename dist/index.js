"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileLoad_1 = require("./fileLoad");
const path_1 = __importDefault(require("path"));
// find all files that end with `.kj.ts` in the current directory
const testFiles = (0, fileLoad_1.findTestFiles)('./', /\.ks\.(ts|js)$/);
console.log(testFiles);
// execute all test files
testFiles.forEach((file) => {
    const absolutePath = path_1.default.resolve(file);
    require(absolutePath);
});
