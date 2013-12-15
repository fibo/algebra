
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./ComplexField')
  , inherits       = require('inherits')

var data
  , field = new Field()

function ComplexElement() {

  if (arguments.length === 0)
    data = [1, 0]

  if (arguments.length === 1)
    data = arguments[0]

  if (arguments.length === 2)
    data = [arguments[0], arguments[1]]

  AlgebraElement.call(this, field, data)
}

inherits(ComplexElement, AlgebraElement)

function conjugation(element) {
  this.data = this.field.conjugation(this.data)

  return this
}
ComplexElement.prototype.conjugation = conjugation
ComplexElement.prototype.conj        = conjugation

module.exports = ComplexElement

