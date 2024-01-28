import * as fs from 'fs';
import * as path from 'path';
export function findTestFiles(dir, pattern) {
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
