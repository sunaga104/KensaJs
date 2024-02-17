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
    /**
     * Adds a new test to the Kensa suite.
     *
     * @param {Object} params - The parameters for the test.
     * @param {string} params.title - The title of the test.
     * @param {any} params.input - The test function or value to be tested.
     * @param {any} params.expect - The expected result of the test.
     */
    function test({ title, input, expect, }) {
        const testPromise = (0, test_1.default)({ title, input, expect });
        tests.push(testPromise);
    }
    /**
     * Runs all tests in the Kensa suite or specified runners if provided.
     *
     * @param {Function[]} [runners] - Optional. An array of runner functions to execute instead of the internal test suite.
     * @returns {Promise<void>} A promise that resolves once all tests have been executed.
     */
    async function run(runners) {
        if (runners) {
            let filstFlg = true;
            for (const runner of runners) {
                if (filstFlg) {
                    filstFlg = false;
                }
                else {
                    console.log();
                    console.log('------------------------------------------');
                }
                await runner();
            }
        }
        else {
            (0, message_1.callTitle)(kensaTitle);
            for (const test of tests) {
                await test();
            }
            tests = [];
        }
    }
    /**
     * Returns a runner function that, when called, runs all tests in the Kensa suite.
     *
     * @returns {Function} A function that runs the test suite when invoked.
     */
    function getRunner() {
        return async () => {
            await run();
        };
    }
    return {
        test,
        run,
        getRunner,
    };
}
exports.default = Kensa;
//# sourceMappingURL=index.js.map