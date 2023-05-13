import { isRational, Rational, add, mul, neg } from 'arithmetica'
import {AlgebraRing} from './ring.js'

export const Q: AlgebraRing<Rational> = {
  eq(a, b) { return a === b},
  includes(arg: unknown): arg is Rational {
    return isRational(arg)
  },
  zero: "0",
  one: "1",
  add(a , b ) {
    return add(a, b)
  },
  neg(a ) {
    return neg(a)
  },
  mul(a , b ) {
    return mul(a, b)
  },
  inv(a ) {
    // TODO implement inv in arithmetica
    return a
  }
}
