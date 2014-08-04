
//
// # RealElement
//
// Element of the real field.
//
// ## Examples
//
// * [realNumbers](../examples/realNumbers.html)
//

var AlgebraElement = require('./AlgebraElement')
  , Field          = require('./RealField')
  , inherits       = require('inherits')

var data
  , field = new Field()

function RealElement (data) {
  //if (! (field.validate(data)))
  //  throw new TypeError()

  AlgebraElement.call(this, field, data)
}

inherits(RealElement, AlgebraElement)

module.exports = RealElement

