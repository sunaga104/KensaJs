"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTestsSuite = void 0;
const message_1 = require("../infrastructure/log/message");
let queue = Promise.resolve();
let totalSuiteCount = 0;
let completedSuiteCount = 0;
let allSuccessCount = 0;
let allFailureCount = 0;
function runTestsSuite(testSuite) {
    totalSuiteCount++;
    queue = queue.then(async () => {
        let testResult = true;
        let successCount = 0;
        let failureCount = 0;
        let totalCount = 0;
        (0, message_1.space)();
        (0, message_1.space)();
        (0, message_1.callTitle)(testSuite.title);
        let currentParagraph = 0;
        let paragraphIndexes = [];
        const updateParagraphIndex = (testParagraph) => {
            let paragraphIndex = paragraphIndexes.find((i) => i.paragraph === testParagraph);
            if (!paragraphIndex) {
                paragraphIndex = { paragraph: testParagraph, count: 0 };
                paragraphIndexes.push(paragraphIndex);
            }
            paragraphIndex.count++;
            return paragraphIndex;
        };
        for (const test of testSuite.tests) {
            if (typeof test === 'function') {
                totalCount++;
                const result = await test(currentParagraph);
                result ? successCount++ : failureCount++;
            }
            else {
                currentParagraph = test.paragraph;
                const paragraphIndex = updateParagraphIndex(currentParagraph);
                (0, message_1.callSubTitle)(test.title, test.paragraph, paragraphIndex.count);
            }
        }
        // output test result
        testResult = failureCount === 0;
        testResult ? (0, message_1.passLogo)() : (0, message_1.failLogo)();
        (0, message_1.resultMsg)(totalCount, successCount, failureCount);
        testResult ? allSuccessCount++ : allFailureCount++;
        completedSuiteCount++;
        // output all test result
        if (completedSuiteCount === totalSuiteCount) {
            (0, message_1.space)();
            (0, message_1.allKsTestResultMsg)(totalSuiteCount, allSuccessCount, allFailureCount);
            (0, message_1.space)();
        }
    });
}
exports.runTestsSuite = runTestsSuite;
//# sourceMappingURL=runTestsSuite.js.map