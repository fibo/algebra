import type { Group } from "./group.js";
export declare type Ring<T> = Group<T> & Readonly<{
    one: T;
    mul: (a: T, b: T) => T;
    inv: (a: T) => T;
    div: (a: T, b: T) => T;
}>;
