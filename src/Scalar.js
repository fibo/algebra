
var inherits = require('inherits')

var buildFieldOperators = require('./buildFieldOperators'),
    Element             = require('./Element')

var fieldOperator,
    one,
    zero

/**
 * Element of a field.
 *
 * @class
 *
 * @param {Object} field
 * @param {Any} data
 */

function Scalar (field, data) {
  fieldOperator = buildFieldOperators(field)
  one  = field.one
  zero = field.zero

  Element.call(this, data, field.operator.contains)
}

inherits(Scalar, Element)

Scalar.one  = one
Scalar.zero = zero

/*!
 */

function scalarAddition () {
  var fieldAddition = fieldOperator.addition

  this.data = fieldAddition(this.data, fieldAddition.apply(null, arguments))

  return this
}

Scalar.prototype.addition = scalarAddition
Scalar.prototype.add      = scalarAddition

/*!
 */

function scalarSubtraction () {
  var fieldSubtraction = fieldOperator.subtraction

  this.data = fieldSubtraction(this.data, fieldSubtraction.apply(null, arguments))

  return this
}

Scalar.prototype.subtraction = scalarSubtraction
Scalar.prototype.sub         = scalarSubtraction

/*!
 */

function scalarMultiplication () {
  var fieldMultiplication = fieldOperator.multiplication

  this.data = fieldMultiplication(this.data, fieldMultiplication.apply(null, arguments))

  return this
}

Scalar.prototype.multiplication = scalarMultiplication
Scalar.prototype.mul            = scalarMultiplication

/*!
 */

function scalarDivision () {
  var fieldDivision = fieldOperator.division

  this.data = fieldDivision(this.data, fieldDivision.apply(null, arguments))

  return this
}

Scalar.prototype.division = scalarDivision
Scalar.prototype.div      = scalarDivision

/*!
 */

function scalarInversion () {
  var fieldInversion = fieldOperator.inversion

  this.data = fieldInversion(this.data)

  return this
}

Scalar.prototype.inversion = scalarInversion
Scalar.prototype.inv       = scalarInversion

/*!
 */

function scalarEqual () {
  var fieldEqual = fieldOperator.equal

  return fieldEqual(this.data, fieldEqual.apply(null, arguments))
}

Scalar.prototype.equal = scalarEqual
Scalar.prototype.eq    = scalarEqual

/*!
 */

function scalarNegation () {
  var fieldNegation = fieldOperator.negation

  this.data = fieldNegation(this.data)

  return this
}

Scalar.prototype.negation = scalarNegation
Scalar.prototype.neg      = scalarNegation

module.exports = Scalar

