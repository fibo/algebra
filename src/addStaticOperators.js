
/*!
 * Add operator operators to Scalar as static methods
 *
 * @function
 *
 * @param {Object} Scalar class
 * @param {Object} operator
 */

function addStaticOperators (Scalar, operator) {
  Scalar.addition       = operator.addition
  Scalar.add            = operator.addition

  Scalar.subtraction    = operator.subtraction
  Scalar.sub            = operator.subtraction

  Scalar.multiplication = operator.multiplication
  Scalar.mul            = operator.multiplication

  Scalar.division       = operator.division
  Scalar.div            = operator.division

  Scalar.negation       = operator.negation
  Scalar.neg            = operator.negation

  Scalar.inversion      = operator.inversion
  Scalar.inv            = operator.inversion

  Scalar.equal          = operator.equal
  Scalar.eq             = operator.equal

  Scalar.contains       = operator.contains

  if (typeof operator.conjugation === 'function') {
    Scalar.conjugation = operator.conjugation
    Scalar.conj        = operator.conjugation
  }
}

module.exports = addStaticOperators

