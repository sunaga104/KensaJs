#!/usr/bin/env node
/**
 * find all files in a directory that match a pattern
 * @param dir target directory
 * @param pattern regex pattern to match
 * @returns
 */
export declare function findTestFiles(dir: string, pattern: RegExp): string[];
/**
 * KensaJs main function
 * @example
 * const kensa = Kensa();
 * kensa.title('Sample test');
 * @returns
 */
export default function Kensa(): {
    title: (msg: string) => void;
    msg: (msg: string) => void;
    test: ({ title, func, expect, }: {
        title: string;
        func: any;
        expect: any;
    }) => void;
};
//# sourceMappingURL=index.d.ts.map