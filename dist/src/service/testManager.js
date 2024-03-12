"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTestManager = () => {
    let isRunning = false;
    const setIsRunning = (value) => {
        isRunning = value;
    };
    return {
        get isRunning() {
            return isRunning;
        },
        setIsRunning,
    };
};
exports.default = createTestManager;
//# sourceMappingURL=testManager.js.map