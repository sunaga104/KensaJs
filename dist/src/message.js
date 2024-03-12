"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.space = exports.decoratLine3 = exports.decoratLine2 = exports.decoratLine = exports.splitLine = exports.allKsTestResultMsg = exports.allResultMsg = exports.resultMsg = exports.successLog = exports.failureLog = exports.failLogo = exports.passLogo = exports.msg = exports.callTitle = void 0;
const style_1 = require("./style");
function callTitle(msg) {
    console.log('📄', (0, style_1.logStyle)(msg).bold().build());
}
exports.callTitle = callTitle;
function msg(msg) {
    console.log((0, style_1.logStyle)(msg).bold().build());
}
exports.msg = msg;
function passLogo() {
    (0, style_1.logStyle)(' PASS ').bgGreen().white().bold().log();
}
exports.passLogo = passLogo;
function failLogo() {
    (0, style_1.logStyle)(' FAIL ').bgRed().white().bold().log();
}
exports.failLogo = failLogo;
function failureLog(title, result, expected) {
    console.log(' ', (0, style_1.logStyle)('✗').red().bold().build(), '', title, ` (result: ${(0, style_1.logStyle)(String(result)).red().build()}, expected: ${(0, style_1.logStyle)(String(expected))
        .yellow()
        .build()})`);
}
exports.failureLog = failureLog;
function successLog(title) {
    console.log(' ', (0, style_1.logStyle)('✓').green().bold().build(), '', title);
}
exports.successLog = successLog;
function resultMsg(total, success, failur) {
    console.log(`TOTAL: ${total}, PASS: ${(0, style_1.logStyle)(String(success))
        .green()
        .build()}, FAIL: ${(0, style_1.logStyle)(String(failur)).red().build()}`);
}
exports.resultMsg = resultMsg;
function allResultMsg(total, success, failur) {
    if (failur === 0) {
        (0, style_1.logStyle)(decoratLine()).green().log();
        passLogo();
    }
    else {
        (0, style_1.logStyle)(decoratLine()).red().log();
        failLogo();
    }
    console.log(`TOTAL TESTS: ${total}, PASS: ${(0, style_1.logStyle)(String(success))
        .green()
        .build()}, FAIL: ${(0, style_1.logStyle)(String(failur)).red().build()}`);
    if (failur === 0) {
        (0, style_1.logStyle)(decoratLine()).green().log();
    }
    else {
        (0, style_1.logStyle)(decoratLine()).red().log();
    }
}
exports.allResultMsg = allResultMsg;
function allKsTestResultMsg(total, success, failur) {
    if (failur === 0) {
        (0, style_1.logStyle)(decoratLine2()).green().bold().log();
        passLogo();
    }
    else {
        (0, style_1.logStyle)(decoratLine2()).red().bold().log();
        failLogo();
    }
    console.log(`TOTAL FILES: ${total}`);
    console.log(`PASS: ${(0, style_1.logStyle)(String(success)).green().build()}`);
    console.log(`FAIL: ${(0, style_1.logStyle)(String(failur)).red().build()}`);
    if (failur === 0) {
        (0, style_1.logStyle)(decoratLine2()).green().bold().log();
    }
    else {
        (0, style_1.logStyle)(decoratLine2()).red().bold().log();
    }
}
exports.allKsTestResultMsg = allKsTestResultMsg;
function splitLine() {
    console.log();
    console.log('------------------------------------------');
    console.log();
}
exports.splitLine = splitLine;
function decoratLine() {
    return '*********************************************';
}
exports.decoratLine = decoratLine;
function decoratLine2() {
    return '===============================================================';
}
exports.decoratLine2 = decoratLine2;
function decoratLine3() {
    return '----------------------------------------------';
}
exports.decoratLine3 = decoratLine3;
function space() {
    console.log();
}
exports.space = space;
//# sourceMappingURL=message.js.map