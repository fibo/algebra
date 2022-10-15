import { ErrorElementDimension, ErrorElementHasNoInverse } from "./errors.js";
import type { Ring } from "./ring.js";
import { VectorSpace, vectorSpace } from "./vector.js";

export type MatrixSpace<T> = VectorSpace<T> &
  Readonly<{
    /**
      Row by column multiplication
      @throws {ErrorElementDimension}
     */
    mul: (a: T[], b: T[]) => T[];
    numRows: number;
    numColumns: number;
  }>;

export type SquareMatrixSpace<T> = MatrixSpace<T> &
  Readonly<{
    /**
      Row by column multiplication
      @throws {ErrorElementDimension}
     */
    det: (a: T[]) => T;
  }>;

export type InvertibleMatrixSpace<T> = SquareMatrixSpace<T> &
  Readonly<{
    /**
      Matrix inversion
      @throws {ErrorElementDimension}
      @throws {ErrorElementHasNoInverse}
     */
    inv: (a: T[]) => T;
  }>;

export const matrixSpace = <T>(
  ring: Ring<T>,
  numRows: number,
  numColumns: number
): MatrixSpace<T> => {
  const dimension = numRows * numColumns;
  const space = vectorSpace(ring, dimension);
  return Object.freeze({
    numRows,
    numColumns,
    ...space,
    mul: (a, b) => {
      if (a.length !== dimension || b.length !== dimension)
        throw new ErrorElementDimension();
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          // TODO
          console.log(i, j);
        }
      }
      return a;
    },
  });
};

export const squareMatrixSpace = <T>(
  ring: Ring<T>,
  /** Number of rows or columns */
  size: number
): SquareMatrixSpace<T> => {
  const space = matrixSpace(ring, size, size);
  const { dimension } = space;
  return Object.freeze({
    ...space,
    numRows: size,
    numColumns: size,
    det: (a) => {
      if (a.length !== dimension) throw new ErrorElementDimension();
      return ring.one;
    },
  });
};

export const invertibleMatrixSpace = <T>(
  ring: Ring<T>,
  /** Number of rows or columns */
  size: number
): InvertibleMatrixSpace<T> => {
  const space = squareMatrixSpace(ring, size);
  const { dimension } = space;
  return Object.freeze({
    ...space,
    numRows: size,
    numColumns: size,
    includes: (arg: unknown): arg is T[] =>
      // Determinant must be nonzero.
      space.includes(arg) && !ring.eq(space.det(arg), ring.zero),
    inv: (a: T[]) => {
      if (a.length !== dimension) throw new ErrorElementDimension();
      const determinant = space.det(a);
      if (ring.eq(determinant, ring.zero)) throw new ErrorElementHasNoInverse();
      // TODO
      return ring.one;
    },
  });
};
