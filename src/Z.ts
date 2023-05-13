import {AlgebraGroup}from './Group.js'

export const Z: AlgebraGroup<bigint> = {
  eq(a, b){return a===b},
  includes(arg): arg is bigint {
    return typeof arg === 'bigint'
  },
  zero: 0n,
  add(a, b) {
    return a + b
  },
  neg(a) {
    return -a
  }
}
