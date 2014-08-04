
var AlgebraField = require('./AlgebraField')

/**
 * Abstract algebra element
 *
 * @param {Object} field
 * @param {Any} data
 */

function AlgebraElement(field, data) {
  this.field = field

  // Attribute data defaults to one.
  if (typeof data === 'undefined')
    data = field.one

  this.data = data
}

/**
 * Get element data
 *
 * @return {Any} data
 */

function valueOf () {
  return this.data
}

AlgebraElement.prototype.valueOf = valueOf

/**
 * Get a copy of this AlgebraElement
 *
 * @return {Object} AlgebraElement
 */

function clone () {
  // I only pass the element data cause *this.constructor* refers to some AlgebraElement subclass
  // so it should be aware of its field.

  return new this.constructor(this.data)
}

AlgebraElement.prototype.clone = clone

/**
 * Return data from given argument
 *
 * @api private
 */

function coerceToData () {
  var arg0 = arguments[0]
    , data

  if (arg0 instanceof AlgebraElement)
    data = arg0.data
  else
    data = arg0

  return data
}

//
// Methods of AlgebraElement are operators wrapping the homonym AlgebraField operator.
//

/**
 *
 * @param {Any} arg
 * @return {Object} self
 */

function addition () {
  var data = coerceToData(arguments[0])

  this.data = this.field.addition(this.data, data)

  return this
}
AlgebraElement.prototype.addition = addition
AlgebraElement.prototype.add      = addition

/**
 *
 * @param {Any} arg
 * @return {Object} self
 */

function subtraction () {
  var data = coerceToData(arguments[0])

  this.data = this.field.subtraction(this.data, data)

  return this
}
AlgebraElement.prototype.subtraction = subtraction
AlgebraElement.prototype.sub         = subtraction

/**
 *
 * @param {Any} arg
 * @return {Object} self
 */

function multiplication () {
  var data = coerceToData(arguments[0])

  this.data = this.field.multiplication(this.data, data)

  return this
}
AlgebraElement.prototype.multiplication = multiplication
AlgebraElement.prototype.mul            = multiplication

/**
 *
 * @param {Any} arg
 * @return {Object} self
 */

function division () {
  var data = coerceToData(arguments[0])

  this.data = this.field.division(this.data, data)

  return this
}
AlgebraElement.prototype.division = division
AlgebraElement.prototype.div      = division

/**
 *
 * @return {Object} self
 */

function negation () {
  this.data = this.field.negation(this.data, data)

  return this
}
AlgebraElement.prototype.negation = negation
AlgebraElement.prototype.neg      = negation

/**
 *
 * @return {Object} self
 */

function inversion () {
  this.data = this.field.inversion(this.data, data)

  return this
}
AlgebraElement.prototype.inversion = inversion
AlgebraElement.prototype.inv       = inversion

/**
 *
 * @param {Any} arg
 * @return {Boolean}
 */

function equal () {
  var data = coerceToData(arguments[0])

  return this.field.equal(this.data, data)
}
AlgebraElement.prototype.equal = equal
AlgebraElement.prototype.eq    = equal

/**
 *
 * @param {Any} arg
 * @return {Boolean}
 */

function notEqual () {
  var data = coerceToData(arguments[0])

  return this.field.notEqual(this.data, data)
}
AlgebraElement.prototype.notEqual = notEqual
AlgebraElement.prototype.ne       = notEqual

module.exports = AlgebraElement

