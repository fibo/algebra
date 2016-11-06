const binaryField = {
  zero: 0,
  one: 1,
  contains: (a) => ((a === 0) || (a === 1)),
  addition: (a, b) => ((a + b) % 2),
  equality: (a, b) => a === b,
  negation: (a) => a,
  multiplication: (a, b) => ((a * b) % 2),
  inversion: (a) => a
}

module.exports = binaryField
