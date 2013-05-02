
var Element = require('../Element.js')

var is = {}

function isArray () {
  return Array.isArray(arguments[0])
}
is.array = isArray

function isArrayOfElements () {
  var arg = arguments[0]

  if(! Array.isArray(arg))
    return false

  for (var i in arg)
    if (! arg[i] instanceof Element)
      return false

  return true
}
is.arrayOfElements = isArrayOfElements

function isElementWithNumberDataType () {
  if (typeof arguments[0].getData === 'function')
    return typeof arguments[0].getData() === 'number'

  return false
}
is.elementWithNumberDataType = isElementWithNumberDataType

function isNumber () {
  return typeof arguments[0] === 'number'
}

is.number = isNumber

function isNotNumber () {
  return typeof arguments[0] !== 'number'
}
is.notNumber = isNotNumber

function isUndefined () {
  return typeof arguments[0] === 'undefined'
}

is.undef = isUndefined

module.exports = is

