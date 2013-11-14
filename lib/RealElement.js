
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./RealField')
  , inherits       = require('inherits')

var data
  , field = new Field()

function RealElement() {
  var arg = arguments
    , data = arg[0] || 1

  if (typeof data !== 'number')
    throw new TypeError()

  AlgebraElement.call(this, field, data)
}

inherits(RealElement, AlgebraElement)

module.exports = RealElement

