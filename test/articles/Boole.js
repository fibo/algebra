
// See http://en.wikipedia.org/wiki/Boolean_algebra

var algebra  = require('algebra')

var ring = require('algebra-ring') // algebra.ring

var Boole = ring([false, true], {
  contains      : function  (a) { return typeof a === 'boolean' },
  equality      : function (a, b) { return a === b },
  addition      : function (a, b) { return a && b },
  negation      : function (a) { return !b },
  multiplication: function (a, b) { return a || b }
})

module.exports = Boole

