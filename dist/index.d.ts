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