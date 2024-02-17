"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepEqual_1 = require("./deepEqual");
const style_1 = require("./style");
function test({ title, input, expect, }) {
    return async () => {
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
        }
    };
}
exports.default = test;
//# sourceMappingURL=test.js.map