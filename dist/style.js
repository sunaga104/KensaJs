"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yellow = exports.red = exports.green = exports.bold = void 0;
// Helper functions for styling console logs
function bold(msg) {
    return `\x1b[1m${msg}\x1b[22m`;
}
exports.bold = bold;
function green(msg) {
    return `\x1b[32m${msg}\x1b[39m`;
}
exports.green = green;
function red(msg) {
    return `\x1b[31m${msg}\x1b[39m`;
}
exports.red = red;
function yellow(msg) {
    return `\x1b[33m${msg}\x1b[39m`;
}
exports.yellow = yellow;
//# sourceMappingURL=style.js.map