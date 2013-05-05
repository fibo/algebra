
var is = require('./is.js')

var coerce = {}

function coerceArgumentsToArray () {

  if (is.array(arguments[0]))
    return arguments[0]

  var array = []

  for (var i in arguments)
    array.push(arguments[i])

  return array
}
coerce.argumentsToArray = coerceArgumentsToArray

function coerceToNumber () {
  var arg = arguments[0]

  if (is.number(arg))
    return arg

  if (is.elementWithNumberDataType(arg))
    return arg.getData()

  throw new Error()
}
coerce.toNumber = coerceToNumber

module.exports = coerce

