"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepEqual_1 = require("./utils/deepEqual");
const message_1 = require("../infrastructure/log/message");
function testMain({ title, input, expect, }) {
    return async (paragraph) => {
        try {
            let result;
            if (input instanceof Function) {
                result = await input();
            }
            else {
                result = input;
            }
            if (expect instanceof Error) {
                (0, message_1.failureLog)(title, result, expect.message, paragraph);
                return false;
            }
            else if (!(0, deepEqual_1.deepEqual)(result, expect)) {
                (0, message_1.failureLog)(title, result, expect, paragraph);
                return false;
            }
            else {
                (0, message_1.successLog)(title, paragraph);
                return true;
            }
        }
        catch (e) {
            if (expect instanceof Error && e instanceof Error) {
                if (e.message === expect.message) {
                    (0, message_1.successLog)(title, paragraph);
                    return true;
                }
                else {
                    (0, message_1.failureLog)(title, e.message, expect.message, paragraph);
                    return false;
                }
            }
            else if (e instanceof Error) {
                (0, message_1.failureLog)(title, e.message, expect, paragraph);
                return false;
            }
            else {
                (0, message_1.failureLog)(title, 'Unknown error', expect, paragraph);
                console.log(e);
                return false;
            }
        }
    };
}
exports.default = testMain;
//# sourceMappingURL=testMain.js.map