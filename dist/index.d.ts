/**
 * Creates a new instance of the KensaJs testing framework.
 * This function provides a simple interface for defining and running tests.
 *
 * @example
 * const ks = Kensa();
 * ks.title('Sample test');
 * // simple message
 * ks.msg('Starting tests...');
 *
 * // simple test
 * ks.test({
 *   title: 'simple Test Example',
 *   input: add(1 + 1),
 *   expect: 2,
 * });
 *
 * @returns An object containing the `title`, `msg`, and `test` functions for defining and running tests.
 */
export default function Kensa(): {
    title: (msg: string) => void;
    msg: (msg: string) => void;
    test: ({ title, input, expect, }: {
        title: string;
        input: any;
        expect: any;
    }) => Promise<void>;
};
//# sourceMappingURL=index.d.ts.map