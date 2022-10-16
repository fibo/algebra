import { ErrorInvalidDimension } from "./errors.js";
import { Ring } from "./ring.js";
import { VectorSpace, vectorSpace } from "./vector.js";

export type CayleyDickson<T> = VectorSpace<T> & {
  conj: (a: T[]) => T[];
  /**
    Multiplication law is given by

    a = (p, q)
    b = (r, s)

    (p, q) * (r, s) = (p * r - conj(s) * q, s * p + q * conj(r))
   */
  mul: (a: T[], b: T[]) => T[];
};

/**

@throws {ErrorInvalidDimension}
*/
export const cayleyDickson = <T>(
  ring: Ring<T>,
  dimension: number
): CayleyDickson<T> => {
  if (
    // avoid dimension = 1,
    // in this case conj() is the identity and T[] is an array with length one.
    dimension === 1 ||
    // dimension must be a power of two
    (Math.log(dimension) / Math.log(2)) % 1 !== 0
  )
    throw new ErrorInvalidDimension();

  const space = vectorSpace<T>(ring, dimension);

  return Object.freeze({
    ...space,
    mul: (a, _b) => a, // TODO
    conj: (a) =>
      a.map((value, index) => (index === 0 ? value : ring.neg(value))),
  });
};
