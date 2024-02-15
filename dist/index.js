"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log('📄', bold(msg));
    }
    /**
     * Displays a bold message to the console. Useful for additional information or test results.
     *
     * @param msg - The message to be displayed.
     */
    function msg(msg) {
        console.log(bold(msg));
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
                console.log(bold(red('✗')), title, ` (expected error: ${yellow(expect.message)}, but got result: ${red(String(result))})`);
            }
            else if (result !== expect) {
                console.log(bold(red('✗')), title, ` (result: ${red(String(result))}, expected: ${yellow(String(expect))})`);
            }
            else {
                console.log(bold(green('✓')), title);
            }
        }
        catch (e) {
            if (expect instanceof Error && e instanceof Error) {
                if (e.message === expect.message) {
                    console.log(bold(green('✓')), title);
                }
                else {
                    console.log(bold(red('✗')), title, ` (result error: ${red(e.message)}, expected error: ${yellow(expect.message)})`);
                }
            }
            else if (e instanceof Error) {
                console.log(bold(red('✗')), title, ` (error: ${red(e.message)})`);
            }
            else {
                console.log(bold(red('✗')), title, ` (error: ${red('Unknown error')})`);
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
// Helper functions for styling console logs
function bold(msg) {
    return `\x1b[1m${msg}\x1b[22m`;
}
function green(msg) {
    return `\x1b[32m${msg}\x1b[39m`;
}
function red(msg) {
    return `\x1b[31m${msg}\x1b[39m`;
}
function yellow(msg) {
    return `\x1b[33m${msg}\x1b[39m`;
}
//# sourceMappingURL=index.js.map