"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('test.ks.js');
const index_js_1 = __importDefault(require("../dist/index.js"));
const ks = (0, index_js_1.default)();
ks.title('Sample');
const testFunction = (a, b) => a + b;
// Test with a simple value
ks.test({
    title: 'Simple Value Test',
    input: testFunction(1, 1),
    expect: 2,
});
// Test a synchronous function
ks.test({
    title: 'Synchronous Test Example',
    input: () => 2 + 2,
    expect: 4,
});
// Test an asynchronous function
ks.test({
    title: 'Asynchronous Test Example',
    input: async () => {
        return new Promise((resolve) => setTimeout(() => resolve('async result'), 100));
    },
    expect: 'async result',
});
// Test expecting an error to be thrown
ks.test({
    title: 'Error Expectation Test',
    input: () => {
        throw new Error('Test error');
    },
    expect: new Error('Test error'),
});
//# sourceMappingURL=test.ks.js.map