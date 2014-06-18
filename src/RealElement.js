
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
  /* data defaults to 1 and must be a number */
  if (typeof data === 'undefined')
    data = 1

  if (typeof data !== 'number')
    throw new TypeError()

  AlgebraElement.call(this, field, data)
}

inherits(RealElement, AlgebraElement)

module.exports = RealElement

