
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./QuaternionField')
  , inherits       = require('inherits')

var data
  , field = new Field()

function QuaternionElement () {

  if (arguments.length === 0)
    data = [1, 0, 0, 0]

  if (arguments.length === 1)
    if (typeof arguments[0] === "number")
      data = [arguments[0], 0, 0, 0]
    else
      data = arguments[0]

  if (arguments.length === 3)
    data = [0, arguments[0], arguments[1], arguments[2]]

  AlgebraElement.call(this, field, data)
}

inherits(QuaternionElement, AlgebraElement)

module.exports = QuaternionElement

