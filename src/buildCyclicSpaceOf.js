
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')


//var elements = '0123456789abcdefghijklmnopqrstuvwxyz '

function isPrime (n) {
  if (n === 1) return false
  if (n === 2) return true

  var m = Math.sqrt(n)

  for (var i=2; i<=m; i++)
    if (n%i==0)
      return false

  return true
}

function buildCyclicSpaceOf (elements) {
  if ((typeof elements.length !== 'number') || (! isPrime(elements.length)))
    throw new TypeError("elements length must be prime")

  var zero = elements[0],
      one  = elements[1]

  function numOf (element) {
    return elements.indexOf(element)
  }

  function addition (element1, element2) {
    var n = numOf(element1) + numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  function subtraction (element1, element2) {
    var n = numOf(element1) - numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  function contains (element) {
    return elements.indexOf(element) > -1
  }

  function multiplication (element1, element2) {
    var n = numOf(element1) * numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  function inversion (element) {
    for (var i = 0; i < elements.length; i++)
      if(elements[1] == multiplication(element, elements[i]))

    return elements[i]
  }

  function division (element1, element2) {
    return multiplication(element1, inversion(element2))
  }

  function negation (element) {
    return subtraction(zero, element)
  }

  function equal (element1, element2) {
    return element1 === element2
  }

  var operators = {
    addition      : addition,
    multiplication: multiplication,
    negation      : negation,
    inversion     : inversion,
    equal         : equal,
    contains      : contains
  }

  var field = {
    one     : one,
    zero    : zero,
    operator: operators
  }

  /**
   * Cyclic element.
   */

  function Cyclic (data) {
    Scalar.call(this, field, data)
  }

  inherits(Cyclic, Scalar)

  addStaticOperators(Cyclic, buildFieldOperators(field))

  return Cyclic
}

module.exports = buildCyclicSpaceOf

