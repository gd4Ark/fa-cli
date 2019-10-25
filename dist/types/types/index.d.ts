export declare type Obj = Record<string, any>;
export declare type Arr = Record<number, any>;
export interface InitAnswer {
    name: string;
    tpl: string;
}
export interface DownloadQuestion {
    type: string;
    name: string;
    message: string;
    [PropName: string]: any;
}
export interface DownloadAnswer {
    name: string;
    branch: string;
}
export interface Repositorie {
    name: string;
    html_url: string;
    default_branch: string;
}
export interface Template {
    'owner/name': string;
    branch: string;
}
export interface Templates {
    [propName: string]: Template;
}
export interface InstallParameter {
    name: string;
    src: string;
    dest: string;
}
export interface InstallOptions {
    prompts: Obj;
    [propName: string]: any;
}
