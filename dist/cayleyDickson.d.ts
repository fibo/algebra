import { Ring } from "./ring.js";
import { VectorSpace } from "./vector.js";
export declare type CayleyDickson<T> = VectorSpace<T> & {
    conj: (a: T[]) => T[];
    mul: (a: T[], b: T[]) => T[];
};
export declare const cayleyDickson: <T>(ring: Ring<T>, dimension: number) => CayleyDickson<T>;
