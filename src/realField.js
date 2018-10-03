const realField = {
  zero: 0,
  one: 1,
  // NaN, Infinity and -Infinity are not allowed.
  contains: (a) => (typeof a === 'number' && isFinite(a)),
  equality: (a, b) => {
    // Consider
    //
    //     0.1 + 0.2 === 0.3
    //
    // It evaluates to false. Actually the expression
    //
    //     0.1 + 0.2
    //
    // will return
    //
    //     0.30000000000000004
    //
    // Hence we need to aproximate equality with an epsilon.

    const epsilon = 0.000000000001

    return Math.abs(a - b) < epsilon
  },
  addition: (a, b) => a + b,
  negation: (a) => -a,
  multiplication: (a, b) => a * b,
  inversion: (a) => 1 / a
}

module.exports = realField
