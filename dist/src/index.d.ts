/**
 * Creates a new Kensa testing instance for managing and running tests.
 *
 * @param {string} kensaTitle - The title for the Kensa test suite.
 * @returns An object containing methods to add tests, run them, and get a runner function.
 */
export default function Kensa(kensaTitle: string): {
    test: (params: {
        title: string;
        input: any;
        expect: any;
    }) => void;
    run: (runners?: Function[]) => Promise<void>;
    getRunner: () => Function;
};
//# sourceMappingURL=index.d.ts.map