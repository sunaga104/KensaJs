"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msg = exports.callTitle = void 0;
const style_1 = require("./style");
function callTitle(msg) {
    console.log('📄', (0, style_1.bold)(msg));
}
exports.callTitle = callTitle;
function msg(msg) {
    console.log((0, style_1.bold)(msg));
}
exports.msg = msg;
//# sourceMappingURL=message.js.map