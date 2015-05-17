
/*!
 * Add field operators to Scalar as static methods
 *
 * @function
 *
 * @param {Object} Scalar class
 * @param {Object} field
 */

function addStaticOperators (Scalar, field) {
  Scalar.addition       = field.addition
  Scalar.add            = field.addition

  Scalar.subtraction    = field.subtraction
  Scalar.sub            = field.subtraction

  Scalar.multiplication = field.multiplication
  Scalar.mul            = field.multiplication

  Scalar.division       = field.division
  Scalar.div            = field.division

  Scalar.negation       = field.negation
  Scalar.neg            = field.negation

  Scalar.inversion      = field.inversion
  Scalar.inv            = field.inversion

  Scalar.equal          = field.equal
  Scalar.eq             = field.equal

  Scalar.contains       = field.contains
}

module.exports = addStaticOperators

