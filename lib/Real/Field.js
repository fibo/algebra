
var coerce      = require('../util/coerce.js')
  , Field       = require('../Field.js')
  , is          = require('../util/is.js')
  , RealElement = require('./Element.js')
  , util        = require('util')

function RealField () {
  var self = this

  Field.apply(self, arguments)
}

util.inherits(RealField, Field)

function coerceToRealElement () {
  var arg = arguments[0]

  if (arg instanceof RealElement)
    return arg

  if (is.number(arg))
    return new RealElement(arg)

  // TODO raise
}
RealField.prototype.coerceToElement = coerceToRealElement

function getZero () {
  return new RealElement(0)
}
RealField.prototype.getZero = getZero

function getOne () {
  return new RealElement(1)
}
RealField.prototype.getOne = getOne

module.exports = RealField

