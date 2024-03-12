"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("./message");
const test_1 = __importDefault(require("./test"));
/**
 * Creates a new Kensa testing instance for managing and running tests.
 *
 * @param {string} kensaTitle - The title for the Kensa test suite.
 * @returns An object containing methods to add tests, run them, and get a runner function.
 */
function Kensa(kensaTitle) {
    let tests = [];
    function test({ title, input, expect, }) {
        const testPromise = (0, test_1.default)({ title, input, expect });
        tests.push(testPromise);
    }
    async function run(runners) {
        let testResult = true;
        if (runners) {
            testResult = await multiTestRun(runners);
            return testResult;
        }
        else {
            testResult = await singleTestRun(kensaTitle, tests);
            tests = [];
            return testResult;
        }
    }
    function getRunner() {
        return async () => {
            return await run();
        };
    }
    return {
        test,
        run,
        getRunner,
    };
}
exports.default = Kensa;
async function singleTestRun(kensaTitle, tests) {
    let testResult = true;
    (0, message_1.callTitle)(kensaTitle);
    let successCount = 0;
    let failureCount = 0;
    const totalCount = tests.length;
    for (const test of tests) {
        const result = await test();
        if (result) {
            successCount++;
        }
        else {
            failureCount++;
        }
    }
    if (failureCount === 0) {
        (0, message_1.passLogo)();
    }
    else {
        (0, message_1.failLogo)();
        testResult = false;
    }
    (0, message_1.resultMsg)(totalCount, successCount, failureCount);
    return testResult;
}
async function multiTestRun(runners) {
    let testResult = true;
    let successCount = 0;
    let failureCount = 0;
    const totalCount = runners.length;
    for (const runner of runners) {
        const result = await runner();
        if (result) {
            successCount++;
        }
        else {
            failureCount++;
        }
        (0, message_1.splitLine)();
    }
    (0, message_1.allResultMsg)(totalCount, successCount, failureCount);
    if (failureCount > 0) {
        testResult = false;
    }
    return testResult;
}
//# sourceMappingURL=index.js.map