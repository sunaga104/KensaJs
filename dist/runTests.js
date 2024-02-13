#!/usr/bin/env node
import path from 'path';
import * as fs from 'fs';
import { pathToFileURL } from 'url';
// find all files that end with `.ks.ts` or `.ks.js` in the current directory
const basePath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();
console.log(`Searching for .ks.(ts|js) files in: ${basePath}`);
const testFiles = findTestFiles(basePath, /\.ks\.(ts|js)$/);
console.log(testFiles);
// execute all test files
(async () => {
    for (const file of testFiles) {
        try {
            console.log(`Importing test file: ${file}`);
            const url = pathToFileURL(file); // convert path to file:// URL
            await import(url.href);
        }
        catch (error) {
            console.error(`Failed to import ${file}`, error);
        }
    }
})();
/**
 * find all files in a directory that match a pattern
 * @param dir target directory
 * @param pattern regex pattern to match
 * @returns
 */
function findTestFiles(dir, pattern) {
    let results = [];
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
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