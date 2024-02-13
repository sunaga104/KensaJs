/**
 * KensaJs main function
 * @example
 * const kensa = Kensa();
 * kensa.title('Sample test');
 * @returns
 */
export default function Kensa() {
    let errors = [];
    function title(msg) {
        console.log('📄', bold(msg));
    }
    function msg(msg) {
        console.log(bold(msg));
    }
    function test({ title, func, expect, }) {
        errors = [];
        try {
            if (func !== expect) {
                console.log(bold(red('✗')), title, ` (result: ${red(String(func))}, expected: ${yellow(String(expect))})`);
            }
            else {
                console.log(bold(green('✓')), title);
            }
        }
        catch (e) {
            console.log(bold(red('✗')), title);
            errors.push(e);
        }
    }
    return {
        title,
        msg,
        test,
    };
}
function bold(msg) {
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
//# sourceMappingURL=index.js.map