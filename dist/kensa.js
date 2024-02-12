"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * KensaJs main function
 * @example
 * const kensa = Kensa();
 * kensa.title('Sample test');
 * @returns
 */
function Kensa() {
    let errors = [];
    function title(msg) {
        console.log('📄', boid(msg));
    }
    function test({ title, func, expect, }) {
        errors = [];
        try {
            if (func !== expect) {
                console.log(boid(red('✗')), title, ` (result: ${red(func)}, expected: ${yellow(expect)})`);
            }
            else {
                console.log(boid(green('✓')), title);
            }
        }
        catch (e) {
            console.log(boid(red('✗')), title);
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
