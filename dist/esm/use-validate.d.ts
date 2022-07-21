declare type ValidationError = {
    id: string;
    msg: string;
};
declare const useValidate: (initial: any) => {
    isBlank: (d: any) => boolean;
    isEmpty: (d: any[]) => boolean;
    isPristine: (d: any) => boolean;
    includes: (d: string | any[], val: any) => boolean;
    hasPattern: (d: string, regex: RegExp) => boolean;
    hasMaxLength: (d: string, length: number) => boolean;
    hasMinLength: (d: string, length: number) => boolean;
    required: (id: string, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    empty: (id: string, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    notEmpty: (id: string, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    contains: (id: string, val: any, msg?: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    pattern: (id: string, regex: RegExp, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    maxlength: (id: string, n: number, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    minlength: (id: string, n: number, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    greaterThan: (id: string, n: number, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    greaterThanOrEqual: (id: string, n: number, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    lessThan: (id: string, n: number, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    lessThanOrEqual: (id: string, n: number, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    equal: (id: string, val: any, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    notEqual: (id: string, val: any, msg: string) => (d: any) => {
        id: string;
        msg: string;
    } | null;
    and: (...rules: any[]) => (d: any) => any | void;
    or: (...rules: any[]) => (d: any) => ValidationError | null | undefined;
    when: (pred: any, rule: any) => (d: any) => any;
    matches: (id: string, regex: RegExp) => (d: any) => boolean;
    inArray: (id: string, arr: string | any[]) => (d: any) => boolean;
    isNotBlank: (value: number) => () => boolean;
    validate: (validators: any[], data: any) => any;
};
export default useValidate;
