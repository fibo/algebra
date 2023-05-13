import {AlgebraGroup}from './group.js'

export const Zi: AlgebraGroup<[bigint, bigint]> = {
  eq(a,b) {return a[0]=== b[0] && a[1]=== b[1]},
  includes(arg): arg is [bigint, bigint] {
    if (!Array.isArray(arg)) return false
      if (arg.length!==2) return false
    return typeof arg[0] ==='bigint'&& typeof arg[1] === 'bigint'
  },
  zero: [0n, 0n],
  add(a, b) {
    return [a[0] + b[0], a[1]+b[1]]
  },
  neg(a) {
    return [-a[0], -a[1]]
  }
}
