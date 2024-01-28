"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Kensa() {
    let errors = [];
    function title(msg) {
        console.log('📄', boid(msg));
    }
    function test(msg, func, expected) {
        errors = [];
        try {
            if (func !== expected) {
                console.log(boid(red('✗')), msg, ` (result: ${red(func)}, expected: ${yellow(expected)})`);
            }
            else {
                console.log(boid(green('✓')), msg);
            }
        }
        catch (e) {
            console.log(boid(red('✗')), msg);
            errors.push(e);
        }
    }
    return {
        title,
        test,
    };
}
exports.default = Kensa;
function boid(msg) {
    return `\x1b[1m${msg}\x1b[22m`;
}
function green(msg) {
    return `\x1b[32m${msg}\x1b[39m`;
}
function red(msg) {
    return `\x1b[31m${msg}\x1b[39m`;
}
function yellow(msg) {
    return `\x1b[33m${msg}\x1b[39m`;
}
