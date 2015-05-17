
var arrayFrom = require('./arrayFrom'),
    toData    = require('./toData')

/*!
 *
 * @function
 *
 * @param {Object} field
 *
 * @returns {Object} operators
 */

function buildFieldOperators (field) {

  var one  = field.one,
      zero = field.zero

  var addition       = field.operator.addition,
      multiplication = field.operator.multiplication,
      inversion      = field.operator.inversion,
      equal          = field.operator.equal,
      negation       = field.operator.negation

  var operators = {
    contains: field.operator.contains
  }

  /*!
   */

  function subtraction (data1, data2) {
    return addition(data1, negation(data2))
  }

  /*!
   */

  function notEqual (data1, data2) {
    return (! (equal(data1, data2)))
  }

  /*!
   */

  function division (data1, data2) {
    return multiplication(data1, inversion(data2))
  }

  /*!
   */

  function checkIsNotZero (data) {
    if (equal(zero, data))
      throw new TypeError(data)

    return data
  }

  /*!
   */

  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(addition)
  }

  operators.addition = fieldAddition

  /*!
   */

  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(subtraction)
  }

  operators.subtraction = fieldSubtraction

  /*!
   */

  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(multiplication)
  }

  operators.multiplication = fieldMultiplication

  /*!
   */

  function fieldDivision () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(division)
  }

  operators.division = fieldDivision

  /*!
   */

  function fieldInversion () {
    return inversion(toData(arguments[0]))
  }

  operators.inversion = fieldInversion

  /*!
   */

  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(equal)
  }

  operators.equal = fieldEqual

  /*!
   */

  function fieldNegation () {
    return negation(toData(arguments[0]))
  }

  operators.negation = fieldNegation

  return operators
}

module.exports = buildFieldOperators

