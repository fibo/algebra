
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

function isInteger () {
  var arg = arguments[0]

  if(isNotNumber(arg))
    return false

  return arg.toFixed() === arg.toString()
}
is.integer = isInteger

function isNumber () {
  return typeof arguments[0] === 'number'
}

is.number = isNumber

function isNotInteger () {
  return ! isInteger(arguments[0])
}
is.notInteger = isNotInteger

function isNotNumber () {
  return ! isNumber(arguments[0])
}
is.notNumber = isNotNumber

function isNotPositiveInteger () {
  return ! isPositiveInteger(arguments[0])
}
is.notPositiveInteger = isNotPositiveInteger

function isPositiveInteger () {
  var arg = arguments[0]

  if(isNotInteger(arg))
    return false

  return arg > 0
}
is.positiveInteger = isPositiveInteger

function isUndefined () {
  return typeof arguments[0] === 'undefined'
}

is.undef = isUndefined

module.exports = is

