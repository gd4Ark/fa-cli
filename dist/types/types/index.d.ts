export declare type obj = Record<string, any>;
export declare type arr = Record<number, any>;
export interface initAnswer {
    name: string;
    tpl: string;
}
export interface downloadQuestion {
    type: string;
    name: string;
    message: string;
    [PropName: string]: any;
}
export interface downloadAnswer {
    name: string;
    branch: string;
}
export interface repositorie {
    name: string;
    html_url: string;
    default_branch: string;
}
export interface template {
    'owner/name': string;
    branch: string;
}
export interface templates {
    [propName: string]: template;
}
export interface installParameter {
    name: string;
    src: string;
    dest: string;
}
export interface installOptions {
    prompts: obj;
    [propName: string]: any;
}
