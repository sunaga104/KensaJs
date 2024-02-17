"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("./message");
const test_1 = __importDefault(require("./test"));
function Kensa(kensaTitle) {
    let tests = [];
    function test({ title, input, expect, }) {
        const testPromise = (0, test_1.default)({ title, input, expect });
        tests.push(testPromise);
    }
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
//# sourceMappingURL=kensa.js.map