
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./ComplexField')
  , util           = require('util')

var data
  , field = new Field()

function ComplexElement() {

  if (arguments.length === 0) 
    data = [1, 0]

  if (arguments.length === 1)
    data = arguments[0]

  if (arguments.length === 2)
    data = [arguments[0], arguments[1]]

  AlgebraElement.call(this, data, field)
}

util.inherits(ComplexElement, AlgebraElement)

module.exports = ComplexElement

