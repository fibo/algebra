
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./ComplexField')
  , inherits       = require('inherits')

var data
  , field = new Field()

/**
 * Element of the complex field.
 */

function ComplexElement () {

  if (arguments.length === 0)
    data = [1, 0]

  if (arguments.length === 1)
    if (typeof arguments[0] === "number")
      data = [arguments[0], 0]
    else
      data = arguments[0]

  if (arguments.length === 2)
    data = [arguments[0], arguments[1]]

  AlgebraElement.call(this, field, data)
}

inherits(ComplexElement, AlgebraElement)

/**
 * Conjugation operator
 *
 * @return {Object} this
 */

function conjugation() {
  this.data = this.field.conjugation(this.data)

  return this
}
ComplexElement.prototype.conjugation = conjugation
ComplexElement.prototype.conj        = conjugation

module.exports = ComplexElement

