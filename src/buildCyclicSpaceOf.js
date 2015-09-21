
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

/**
 * Check if a number is prime
 *
 * @api private
 *
 * @param {Number} n
 *
 * @returns {Boolean}
 */

function isPrime (n) {
  if (n === 1) return false
  if (n === 2) return true

  var m = Math.sqrt(n)

  for (var i = 2; i <= m; i++)
    if (n % i === 0)
      return false

  return true
}

/**
 * Check if given elements are unique
 *
 * @api private
 *
 * @param {Array} elements
 *
 * @returns {Boolean}
 */

function unique (elements) {
  for (var i = 0; i < elements.length - 1; i++)
    for (var j = i + 1; j < elements.length; j++)
      if (elements[i] === elements[j])
        return false

  return true
}

/**
 * Construct a space isomorphic to Zp: the cyclic group of order p, where p is prime.
 *
 * @api private
 *
 * @param {Array|String} elements
 *
 * @returns {Object} Cyclic
 */

function buildCyclicSpaceOf (elements) {
  if ((typeof elements.length !== 'number') || (! isPrime(elements.length)))
    throw new TypeError("elements length must be prime")

  if ((! unique(elements)))
    throw new TypeError("elements must be unique")

  var zero = elements[0],
      one  = elements[1]

  /*!
   */

  function numOf (element) {
    return elements.indexOf(element)
  }

  /*!
   */

  function addition (element1, element2) {
    var n = numOf(element1) + numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  /*!
   */

  function contains (element) {
    return elements.indexOf(element) > -1
  }

  /*!
   */

  function multiplication (element1, element2) {
    var n = numOf(element1) * numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  /*!
   */

  function inversion (element) {
    for (var i = 0; i < elements.length; i++)
      if(elements[1] == multiplication(element, elements[i]))

    return elements[i]
  }

  /*!
   */

  function division (element1, element2) {
    return multiplication(element1, inversion(element2))
  }

  /*!
   */

  function negation (element) {
    var n = numOf(element)

    if (n === 0)
      return element

    n = elements.length - n

    return elements[n]
  }

  /*!
   */

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

  /*!
   * Cyclic element.
   *
   * @class
   */

  function Cyclic (data) {
    Scalar.call(this, field, data)
  }

  inherits(Cyclic, Scalar)

  addStaticOperators(Cyclic, buildFieldOperators(field))

  return Cyclic
}

module.exports = buildCyclicSpaceOf

