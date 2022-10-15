import type { Group } from "./group.js";
import type { Ring } from "./ring.js";
export declare type VectorSpace<T> = Group<T[]> & Readonly<{
    dimension: number;
    norm: (arg: T[]) => T;
}>;
export declare const vectorSpace: <T>({ zero, includes, eq, add, sub, neg, mul }: Ring<T>, dimension: number) => VectorSpace<T>;
