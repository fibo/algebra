import type { Ring } from "./ring.js";
import { VectorSpace } from "./vector.js";
export declare type MatrixSpace<T> = VectorSpace<T> & Readonly<{
    mul: (a: T[], b: T[]) => T[];
    numRows: number;
    numColumns: number;
}>;
export declare type SquareMatrixSpace<T> = MatrixSpace<T> & Readonly<{
    det: (a: T[]) => T;
}>;
export declare type InvertibleMatrixSpace<T> = SquareMatrixSpace<T> & Readonly<{
    inv: (a: T[]) => T;
}>;
export declare const matrixSpace: <T>(ring: Ring<T>, numRows: number, numColumns: number) => MatrixSpace<T>;
export declare const squareMatrixSpace: <T>(ring: Ring<T>, size: number) => SquareMatrixSpace<T>;
export declare const invertibleMatrixSpace: <T>(ring: Ring<T>, size: number) => InvertibleMatrixSpace<T>;
