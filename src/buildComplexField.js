
var buildFieldOperators = require('./buildFieldOperators')

/*!
 */

function buildComplexField (realField) {
  var zero = [realField.zero, realField.zero],
      one  = [realField.one, realField.zero]

  var add = realField.operator.addition,
      con = realField.operator.contains,
      eql = realField.operator.equal,
      mul = realField.operator.multiplication,
      neg = realField.operator.negation

  /*!
   * z + w = (z0 + i z1) * (w0 + i w1)
   *       = (z0 + w0) + i (z1 + w1)
   */

  function addition (z, w) {
    return [add(z[0], w[0]), add(z[1], w[1])]
  }

  /*!
   * z * w = (z0 + i z1) * (w0 + i w1)
   *       = (z0 * w0 - z1 * w1) + i (z1 * w0 + z0 * w1)
   */

  function multiplication (z, w) {
    return [add(mul(z[0], w[0]), neg(mul(z[1], w[1]))), add(mul(z[1], w[0]), mul(z[0], w[1]))]
  }

  /*!
   * z~ = (z0 + i z1)~
   *    = z0 - i z1
   */

  function conjugation (z) {
    return [z[0], neg(z[1])]
  }

  /*!
   * |z| = |z0 + i z1|
   *     = z0 * z0 + z1 * z1
   */

  function norm (z) {
    return add(mul(z[0], z[0]), mul(z[1], z[1]))
  }

  /*!
   * z^-1 = z~ * 1 / |z|
   */

  function inversion (z) {
    return multiplication(conjugation(z), [realField.one / norm(z), realField.zero])
  }

  /*!
   */

  function equal (z, w) {
    return ((eql(z[0], w[0])) && eql((z[1], w[1])))
  }

  /*!
   */

  function contains (z) {
    return (con(z[0])) && (con(z[1]))
  }

  /*!
   */

  function negation (z) {
    return [neg(z[0]), neg(z[1])]
  }

  var operators = {
    addition      : addition,
    multiplication: multiplication,
    negation      : negation,
    inversion     : inversion,
    equal         : equal,
    contains      : contains,
    conjugation   : conjugation
  }

  var complexField = {
    one     : one,
    zero    : zero,
    operator: operators
  }

  return complexField
}

module.exports = buildComplexField

