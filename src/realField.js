var realField = {
  zero: 0,
  one: 1,
  contains: (a, b) => {
    // NaN, Infinity and -Infinity are not allowed.
    return (typeof a === 'number' && isFinite(a))
  },
  equality: (a, b) => { return a === b },
  addition: (a, b) => { return a + b },
  negation: (a) => { return -a },
  multiplication: (a, b) => { return a * b },
  inversion: (a) => { return 1 / a }
}

module.exports = realField
