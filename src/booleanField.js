var booleanField = {
  zero: false,
  one: true,
  addition: (a, b) => a || b,
  contains: (a) => a,
  equality: (a, b) => a === b,
  negation: (a) => !a,
  multiplication: (a, b) => a || b,
  inversion: (a) => a
}

module.exports = booleanField
