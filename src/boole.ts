import type {Ring} from "./ring.js";

type T = boolean

export const Boole: Ring<T> = Object.freeze({
  zero: false,
  one: true,
  includes: (arg: unknown): arg is T =>
    typeof arg === "boolean",
  eq: (a: T, b: T) => a === b,
  add: (a: T, b: T) => a || b,
  sub: (a: T, b: T) => a || b,
  neg: (a: T) => a,
  mul: (a: T, b: T) => a && b,
  div: (a: T, b: T) => a && b,
  inv: (a: T) => a,
});
