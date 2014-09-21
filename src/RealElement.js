
var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./RealField')
  , inherits       = require('inherits')

var field = new Field()

/**
 * Element of the real field.
 */

function RealElement (data) {
  //if (! (field.validate(data)))
  //  throw new TypeError()

  AlgebraElement.call(this, field, data)
}

inherits(RealElement, AlgebraElement)

module.exports = RealElement
