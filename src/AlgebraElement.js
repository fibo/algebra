
var AlgebraField = require('./AlgebraField')

/**
 * Abstract algebra element
 *
 * @param {Object} field
 * @param {Any} data
 *
 */

function AlgebraElement(field, data) {

  //
  // ## Attributes
  //

  //
  // ### field
  //
  // it is an instance of algebrafield
  //

  if (! (field instanceof AlgebraField))
    throw new TypeError()

  function getField() { return field }

  Object.defineProperty(this, 'field', {get: getField})

  //
  // ### data
  //
  // It is any kind of raw data.
  //

  if (typeof data === 'undefined')
    data = field.one

  function getData() { return data }

  function setData(newData) { data = newData }

  Object.defineProperty(this, 'data', {get: getData, set: setData})

}

/* this.constructor refers to some AlgebraElement subclass,
 since it should be aware of it field, I only pass the element data.

 TODO per ora lo lascio private, non lo documento
 */
function clone () {
  return new this.constructor(this.data)
}
AlgebraElement.prototype.clone = clone

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
// ## Methods
//
// Methods of AlgebraElement are operators wrapping the homonym AlgebraField
// operator.
//

/* TODO manca invert */

//
// ### addition
//

function addition () {
  var data = coerceToData(arguments[0])

  this.data = this.field.addition(this.data, data)
  return this
}
AlgebraElement.prototype.addition = addition
/* TODO per i docs, fai qualche label tipo Alias: add */
AlgebraElement.prototype.add      = addition

//
// ### subtraction
//

function subtraction () {
  var data = coerceToData(arguments[0])

  this.data = this.field.subtraction(this.data, data)
  return this
}
AlgebraElement.prototype.subtraction = subtraction
AlgebraElement.prototype.sub         = subtraction

//
// ### multiplication
//

function multiplication() {
  var data = coerceToData(arguments[0])

  this.data = this.field.multiplication(this.data, data)
  return this
}
AlgebraElement.prototype.multiplication = multiplication
AlgebraElement.prototype.mul            = multiplication

//
// ### division
//

function division () {
  var data = coerceToData(arguments[0])

  this.data = this.field.division(this.data, data)

  return this
}
AlgebraElement.prototype.division = division
AlgebraElement.prototype.div      = division

//
// ### equal
//

function equal () {
  var data = coerceToData(arguments[0])

  return this.field.equal(this.data, data)
}
AlgebraElement.prototype.equal = equal
AlgebraElement.prototype.eq    = equal


//
// ### notEqual
//

function notEqual () {
  var data = coerceToData(arguments[0])

  return this.field.notEqual(this.data, data)
}
AlgebraElement.prototype.equal = notEqual
AlgebraElement.prototype.eq    = notEqual

module.exports = AlgebraElement

