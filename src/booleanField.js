const booleanField = {
  zero: false,
  one: true,
  contains: (a) => (a === true) || (a === false),
  addition: (a, b) => a || b,
  equality: (a, b) => a === b,
  negation: (a) => !a,
  multiplication: (a, b) => a && b,
  inversion: (a) => a
}

module.exports = booleanField
