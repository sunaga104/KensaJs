"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepEqual_1 = require("./deepEqual");
const message_1 = require("./message");
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
                (0, message_1.failureLog)(title, result, expect.message);
                return false;
            }
            else if (!(0, deepEqual_1.deepEqual)(result, expect)) {
                (0, message_1.failureLog)(title, result, expect);
                return false;
            }
            else {
                (0, message_1.successLog)(title);
                return true;
            }
        }
        catch (e) {
            if (expect instanceof Error && e instanceof Error) {
                if (e.message === expect.message) {
                    (0, message_1.successLog)(title);
                    return true;
                }
                else {
                    (0, message_1.failureLog)(title, e.message, expect.message);
                    return false;
                }
            }
            else if (e instanceof Error) {
                (0, message_1.failureLog)(title, e.message, expect);
                return false;
            }
            else {
                (0, message_1.failureLog)(title, 'Unknown error', expect);
                console.log(e);
                return false;
            }
        }
    };
}
exports.default = test;
//# sourceMappingURL=test.js.map