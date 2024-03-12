"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTests = void 0;
// run all tests
async function runTests(testFiles) {
    let allTestResult = true;
    let allSuccessCount = 0;
    let allFailureCount = 0;
    let allTotalCount = testFiles.length;
    for (let index = 0; index < testFiles.length; index++) {
        const file = testFiles[index];
        try {
            const test = require(file);
        }
        catch (error) {
            console.error(`Failed to import ${file}`, error);
            allFailureCount++;
        }
    }
    // allKsTestResultMsg(allTotalCount, allSuccessCount, allFailureCount);
}
exports.runTests = runTests;
//# sourceMappingURL=runTest.js.map