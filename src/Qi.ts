import { isRational, Rational, add, mul, neg, eq } from 'arithmetica'
import {AlgebraRing} from './ring.js'

export const Qi: AlgebraRing<[Rational, Rational]> = {
  eq(a,b) {return eq(a[0], b[0]) && eq(a[1], b[1])},
  includes(arg: unknown): arg is [Rational, Rational] {
    if (!Array.isArray(arg)) return false
      if (arg.length!==2) return false
    return isRational(arg[0]) && isRational(arg[1])
  },
  zero: ["0", "0"],
  one: ["1", "0"],
  add(a , b ) {
    return [add(a[0], b[0]), add(a[1], b[1])]
  },
  neg(a ) {
    return [neg(a[0]), neg(a[1])]
  },
  mul(a, b ) {
    return [mul(a[0], b[0]), mul(a[1], b[1])]
  },
  inv(a ) {
    // TODO implement inv in arithmetica
    return a
  }
}
