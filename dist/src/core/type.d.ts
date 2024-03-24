/**
 * The `SubTitle` interface defines a subtitle and its paragraph number.
 *
 * @param title - The text of the subtitle.
 * @param paragraph - The paragraph number to which the subtitle belongs.
 */
export interface SubTitle {
    title: string;
    paragraph: number;
}
/**
 * The `Test` type defines a function type representing a test case.
 * This function takes a paragraph number and returns a Promise<boolean>.
 *
 * @param paragraph - The paragraph number the test belongs to.
 * @returns A promise containing a boolean that represents the result of the test.
 */
export type Test = (paragraph: number) => Promise<boolean>;
/**
 * The `TestTool` type represents an element within the test suite.
 * It can be either of type `Test` or interface `SubTitle`.
 */
export type TestTool = Test | SubTitle | any;
/**
 * The `TestSuite` interface defines the overall structure of a test suite.
 *
 * @param title - The title of the test suite.
 * @param tests - An array of tests and subtitles included in the test suite.
 */
export interface TestSuite {
    title: string;
    tests: Array<TestTool>;
}
/**
 * The `KensaInstance` interface defines the API of an instance of the Kensa testing framework.
 *
 * @param mainTitle - Sets the main title of the test suite.
 * @param subTitle - Adds a subtitle within the test suite.
 * @param test - Adds a test case.
 * @param run - Executes all tests within the test suite.
 */
export interface KensaInstance {
    /**
     * Sets the main title of the test suite.
     *
     * @param title - The title to set for the test suite.
     */
    mainTitle: (title: string) => void;
    /**
     * Adds a new subtitle within the test suite.
     * Subtitles are used to logically separate test cases.
     *
     * @param title - The text of the subtitle.
     * @param paragraph - Optional. The paragraph number to which the subtitle belongs. The default value is 1 if not specified.
     */
    subTitle: (title: string, paragraph?: number) => void;
    /**
     * Adds a new test case to the test suite.
     * This function receives the test's title, input, and expected output.
     *
     * @object param
     * @param title - The title of the test case.
     * @param input - The input for the test case.
     * @param expect - The expected output of the test case.
     */
    test: (param: {
        title: string;
        input: any;
        expect: any;
    }) => void;
    /**
     * Stubs a method of an object with a specific return value.
     *
     * @param obj - The object to stub.
     * @param method - The method to stub.
     * @param returnValue - The return value of the stubbed method.
     */
    stub: (obj: any, method: any, returnValue: any) => void;
    /**
     * Clears all stubs created during the test suite.
     */
    clearStub: () => void;
    /**
     * Executes all tests within the test suite.
     */
    run: () => void;
}
//# sourceMappingURL=type.d.ts.map