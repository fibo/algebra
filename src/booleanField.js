var booleanField = {
  zero: false,
  one: true,
  contains: function (a) {
    return (a === true) || (a === false)
  },
  addition: function (a, b) { return a || b },
  equality: function (a, b) { return a === b },
  negation: function (a) { return !a },
  multiplication: function (a, b) { return a || b },
  inversion: function (a) { return a }
}

module.exports = booleanField
