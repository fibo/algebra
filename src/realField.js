
var realField = {
  zero: 0,
  one : 1,
  contains:       function (a, b) {
                    // NaN, Infinity and -Infinity are not allowed
                    return (typeof a === 'number' && isFinite(a))
                  },
  equality:       function (a, b) { return a === b },
  addition:       function (a, b) { return a + b },
  negation:       function (a) { return -a },
  multiplication: function (a, b) { return a * b },
  inversion:      function (a) { return 1 / a }
}

module.exports = realField

