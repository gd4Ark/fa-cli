export declare const writeFile: (filePath: string, contents: string, cb: any) => void;
export declare const getTemplte: (filePath: string) => any;
export declare const generate: (files: any[], answers: any) => Promise<void>;
export declare const deleteFiles: (files: any[]) => Promise<void>;
declare const _default: {
    getTemplte: (filePath: string) => any;
    generate: (files: any[], answers: any) => Promise<void>;
    deleteFiles: (files: any[]) => Promise<void>;
};
export default _default;
