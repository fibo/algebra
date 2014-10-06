
/**
 * Add field operators to Scalar as static methods
 *
 * @param {Object} Scalar class
 * @param {Object} field instance
 */

function addStaticOperators (Scalar, field) {
  Scalar.addition       = field.addition
  Scalar.add            = field.addition

  Scalar.subtraction    = field.subtraction
  Scalar.sub            = field.subtraction

  Scalar.multiplication = field.multiplication
  Scalar.mul            = field.multiplication

  Scalar.negation       = field.negation
  Scalar.neg            = field.negation

  Scalar.equal          = field.equal
  Scalar.eq             = field.equal

  Scalar.contains       = field.contains
}

module.exports = addStaticOperators

