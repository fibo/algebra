export declare type Group<T> = Readonly<{
    zero: T;
    includes: (arg: unknown) => arg is T;
    eq: (a: T, b: T) => boolean;
    add: (a: T, b: T) => T;
    neg: (a: T) => T;
    sub: (a: T, b: T) => T;
}>;
