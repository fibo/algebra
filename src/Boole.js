var Boole = {
  zero: false,
  one: true,
  contains: (a) => (typeof a === 'boolean'),
  addition: (a, b) => (a || b),
  equality: (a, b) => (a === b),
  negation: (a) => (a),
  multiplication: (a, b) => (a && b),
  inversion: (a) => (a)
}

module.exports = Boole
