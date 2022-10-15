import { ErrorCannotDivideByZero } from "./errors.js";
import type { Ring } from "./ring.js";

type R = number;

export const real: Ring<R> = Object.freeze({
  zero: 0,
  one: 1,
  includes: (arg: unknown): arg is R =>
    typeof arg === "number" && !isNaN(arg) && isFinite(arg),
  eq: (a: R, b: R) => a === b,
  add: (a: R, b: R) => a + b,
  sub: (a: R, b: R) => a - b,
  neg: (a: R) => -a,
  mul: (a: R, b: R) => a * b,
  div: (a: R, b: R) => {
    if (b === 0) throw new ErrorCannotDivideByZero();
    return a / b;
  },
  inv: (a: R) => {
    if (a === 0) throw new ErrorCannotDivideByZero();
    return 1 / a;
  },
});

/**
Real numbers plus {@link https://en.wikipedia.org/wiki/Point_at_infinity|point at Infinity}
*/
export const realProjectiveLine: Ring<R> = Object.freeze({
  zero: 0,
  one: 1,
  includes: (arg: unknown): arg is R => typeof arg === "number" && !isNaN(arg),
  eq: (a: R, b: R) => a === b,
  add: (a: R, b: R) => a + b,
  sub: (a: R, b: R) => a - b,
  neg: (a: R) => -a,
  mul: (a: R, b: R) => a * b,
  div: (a: R, b: R) => a / b,
  inv: (a: R) => 1 / a,
});
