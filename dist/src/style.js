"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logStyle = void 0;
function logStyle(msg) {
    const bold = () => logStyle(`\x1b[1m${msg}\x1b[22m`);
    const green = () => logStyle(`\x1b[32m${msg}\x1b[39m`);
    const blue = () => logStyle(`\x1b[34m${msg}\x1b[39m`);
    const red = () => logStyle(`\x1b[31m${msg}\x1b[39m`);
    const yellow = () => logStyle(`\x1b[33m${msg}\x1b[39m`);
    const white = () => logStyle(`\x1b[37m${msg}\x1b[39m`);
    const bgGreen = () => logStyle(`\x1b[42m${msg}\x1b[49m`);
    const bgBlue = () => logStyle(`\x1b[44m${msg}\x1b[49m`);
    const bgRed = () => logStyle(`\x1b[41m${msg}\x1b[49m`);
    const build = () => msg;
    const log = () => console.log(msg);
    return {
        bold,
        green,
        blue,
        red,
        yellow,
        white,
        bgGreen,
        bgBlue,
        bgRed,
        build,
        log,
    };
}
exports.logStyle = logStyle;
//# sourceMappingURL=style.js.map