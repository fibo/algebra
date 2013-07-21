
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./QuaternionField')
  , util           = require('util')

var data
  , field = new Field()

function QuaternionElement() {

  if (arguments.length === 0) 
    data = [1, 0, 0, 0]

  if (arguments.length === 1) 
    data = arguments[0]

  if (arguments.length === 3) 
    data = [0, arguments[0], arguments[1], arguments[2]]

  AlgebraElement.call(this, data, field)
}

util.inherits(QuaternionElement, AlgebraElement)

module.exports = QuaternionElement


