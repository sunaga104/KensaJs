"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runTestsSuite_1 = require("./service/runTestsSuite");
const testMain_1 = __importDefault(require("./service/testMain"));
function Kensa() {
    let testSuite = {
        title: '',
        tests: [],
    };
    const mainTitle = (title) => {
        testSuite.title = title;
    };
    const subTitle = (title, paragraph = 1) => {
        testSuite.tests.push({ title, paragraph });
    };
    const test = ({ title, input, expect, }) => {
        const testPromise = (0, testMain_1.default)({ title, input, expect });
        testSuite.tests.push(testPromise);
    };
    const stub = (obj, method, returnValue) => {
        testSuite.tests.push({ stub: { obj, method, returnValue } });
    };
    const clearStub = () => {
        testSuite.tests.push({ clearStub: 'clearStub' });
    };
    const run = () => {
        (0, runTestsSuite_1.runTestsSuite)(testSuite);
        testSuite = {
            title: '',
            tests: [],
        };
    };
    return {
        mainTitle,
        subTitle,
        test,
        stub,
        clearStub,
        run,
    };
}
exports.default = Kensa;
//# sourceMappingURL=index.js.map