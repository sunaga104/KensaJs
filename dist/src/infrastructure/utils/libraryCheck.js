"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsNodeCheck = void 0;
function tsNodeCheck() {
    let tsNodeAvailable = false;
    try {
        require.resolve('ts-node');
        tsNodeAvailable = true;
        require('ts-node').register();
        return tsNodeAvailable;
    }
    catch (error) {
        console.log('`ts-node` is not installed. Proceeding with JavaScript files only.');
        return tsNodeAvailable;
    }
}
exports.tsNodeCheck = tsNodeCheck;
//# sourceMappingURL=libraryCheck.js.map