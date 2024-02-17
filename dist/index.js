"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepEqual_1 = require("./deepEqual");
const style_1 = require("./style");
/**
 * Creates a new instance of the KensaJs testing framework.
 * This function provides a simple interface for defining and running tests.
 *
 * @example
 * const ks = Kensa();
 * ks.title('Sample test');
 * // simple message
 * ks.msg('Starting tests...');
 *
 * // simple test
 * ks.test({
 *   title: 'simple Test Example',
 *   input: add(1 + 1),
 *   expect: 2,
 * });
 *
 * @returns An object containing the `title`, `msg`, and `test` functions for defining and running tests.
 */
function Kensa() {
    let errors = [];
    /**
     * Sets the title for the current test suite.
     *
     * @param msg - The title message for the test suite.
     */
    function title(msg) {
        console.log('📄', (0, style_1.bold)(msg));
    }
    /**
     * Displays a bold message to the console. Useful for additional information or test results.
     *
     * @param msg - The message to be displayed.
     */
    function msg(msg) {
        console.log((0, style_1.bold)(msg));
    }
    /**
     * Asynchronously runs a test with the specified input and expected output.
     * This function supports both synchronous and asynchronous tests, including those that expect errors.
     *
     * @param {Object} params - The parameters for running a test.
     * @param {string} params.title - The title of the test.
     * @param {Function | any} params.input - The test input. This can be a function (sync or async) or a direct value.
     * @param {any} params.expect - The expected result of the test. This can be a value or an Error object for tests that expect an error to be thrown.
     *
     * @returns {Promise<void>} A promise that resolves when the test is complete.
     */
    async function test({ title, input, expect, }) {
        const errors = [];
        try {
            let result;
            if (input instanceof Function) {
                result = await input();
            }
            else {
                result = input;
            }
            if (expect instanceof Error) {
                console.log((0, style_1.bold)((0, style_1.red)('✗')), title, ` (expected error: ${(0, style_1.yellow)(expect.message)}, but got result: ${(0, style_1.red)(String(result))})`);
            }
            else if (!(0, deepEqual_1.deepEqual)(result, expect)) {
                console.log((0, style_1.bold)((0, style_1.red)('✗')), title, ` (result: ${(0, style_1.red)(String(result))}, expected: ${(0, style_1.yellow)(String(expect))})`);
            }
            else {
                console.log((0, style_1.bold)((0, style_1.green)('✓')), title);
            }
        }
        catch (e) {
            if (expect instanceof Error && e instanceof Error) {
                if (e.message === expect.message) {
                    console.log((0, style_1.bold)((0, style_1.green)('✓')), title);
                }
                else {
                    console.log((0, style_1.bold)((0, style_1.red)('✗')), title, ` (result error: ${(0, style_1.red)(e.message)}, expected error: ${(0, style_1.yellow)(expect.message)})`);
                }
            }
            else if (e instanceof Error) {
                console.log((0, style_1.bold)((0, style_1.red)('✗')), title, ` (error: ${(0, style_1.red)(e.message)})`);
            }
            else {
                console.log((0, style_1.bold)((0, style_1.red)('✗')), title, ` (error: ${(0, style_1.red)('Unknown error')})`);
            }
            errors.push(e);
        }
    }
    return {
        title,
        msg,
        test,
    };
}
exports.default = Kensa;
//# sourceMappingURL=index.js.map