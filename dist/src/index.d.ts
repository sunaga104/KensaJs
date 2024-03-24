export default function Kensa(): {
    mainTitle: (title: string) => void;
    subTitle: (title: string, paragraph?: number) => void;
    test: ({ title, input, expect, }: {
        title: string;
        input: any;
        expect: any;
    }) => void;
    stub: (obj: any, method: any, returnValue: any) => void;
    clearStub: () => void;
    run: () => void;
};
//# sourceMappingURL=index.d.ts.map