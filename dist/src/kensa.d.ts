export default function Kensa(kensaTitle: string): {
    test: (params: {
        title: string;
        input: any;
        expect: any;
    }) => void;
    run: (runners?: Function[]) => Promise<void>;
    getRunner: () => Function;
};
//# sourceMappingURL=kensa.d.ts.map