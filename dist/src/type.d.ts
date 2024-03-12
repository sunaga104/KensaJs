export interface KensaStub<T, K extends keyof T> {
    obj: NonNullable<T>;
    method: K;
    returnValue: any;
    async?: boolean;
}
export interface KensaInstance {
    /**
     * Defines a test case for the Kensa suite.
     *
     * @param {string} title - The title of the test case.
     * @param {any} input - The input to the test case.
     * @param {any} expect - The expected output of the test case.
     * @param {KensaStub<T, K>} [stub] - Optional. An object containing the method to stub and the return value.
     */
    test: <T, K extends keyof T>(params: {
        title: string;
        input: any;
        expect: any;
        stub?: KensaStub<T, K>;
    }) => void;
    /**
     * Stubs a method on an object for use in a test.
     *
     * @param {T} obj - The object containing the method to stub.
     * @param {K} method - The name of the method to stub.
     * @param {any} returnValue - The value to return when the method is called.
     * @returns {{ obj: T, method: K, returnValue: any }} An object containing the stubbed object, method name, and return value.
     */
    stub: <T, K extends keyof T>(obj: T, method: K, returnValue: any, async?: boolean) => {
        obj: T;
        method: K;
        returnValue: any;
        async?: boolean;
    };
    /**
     * Runs all tests in the Kensa suite or specified runners if provided.
     *
     * @param {Function[]} [runners] - Optional. An array of runner functions to execute instead of the internal test suite.
     * @returns {Promise<void>} A promise that resolves once all tests have been executed.
     */
    run: (runners?: Function[]) => Promise<boolean>;
    /**
     * Returns a runner function that, when called, runs all tests in the Kensa suite.
     *
     * @returns {Function} A function that runs the test suite when invoked.
     */
    getRunner: () => Function;
}
//# sourceMappingURL=type.d.ts.map