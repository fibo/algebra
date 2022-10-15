import type { Group } from "./group.js";
import type { Ring } from "./ring.js";

export type VectorSpace<T> = Group<T[]> &
  Readonly<{
    dimension: number;
    norm: (arg: T[]) => T;
  }>;

export const vectorSpace = <T>(
  { zero, includes, eq, add, sub, neg, mul }: Ring<T>,
  dimension: number
): VectorSpace<T> =>
  Object.freeze({
    dimension,
    zero: Array.from({ length: dimension }).fill(zero) as T[],
    includes: (arg: unknown): arg is T[] =>
      Array.isArray(arg) && arg.every((value) => includes(value)),
    eq: (a: T[], b: T[]) => a.every((value, index) => eq(value, b[index])),
    add: (a: T[], b: T[]) => a.map((value, index) => add(value, b[index])),
    sub: (a: T[], b: T[]) => a.map((value, index) => sub(value, b[index])),
    neg: (a: T[]) => a.map((value) => neg(value)),
    norm: (a: T[]) =>
      a.reduce((sum, value) => add(sum, mul(value, value)), zero),
  });
