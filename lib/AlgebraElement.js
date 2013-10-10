
var AlgebraField = require('./AlgebraField')

function AlgebraElement(field, data) {

  // field

  if (! (field instanceof AlgebraField))
    throw new TypeError()

  function getField() { return field }

  Object.defineProperty(this, 'field', {get: getField})

  // data

  if (typeof data === 'undefined')
    data = field.one

  function getData() { return data }

  function setData(newData) { data = newData }

  Object.defineProperty(this, 'data', {get: getData, set: setData})

}

function coerceToData () {
  var arg0 = arguments[0]
    , data

  if (arg0 instanceof AlgebraElement)
    data = arg0.data
  else
    data = arg0

  return data
}

function addition () {
  var data = coerceToData(arguments[0])

  this.data = this.field.addition(this.data, data)
  return this
}
AlgebraElement.prototype.addition = addition
AlgebraElement.prototype.add      = addition

function subtraction () {
  var data = coerceToData(arguments[0])

  this.data = this.field.subtraction(this.data, data)
  return this
}
AlgebraElement.prototype.subtraction = subtraction
AlgebraElement.prototype.sub         = subtraction

function multiplication() {
  var data = coerceToData(arguments[0])

  this.data = this.field.multiplication(this.data, data)
  return this
}
AlgebraElement.prototype.multiplication = multiplication
AlgebraElement.prototype.mul            = multiplication

function division () {
  var data = coerceToData(arguments[0])

  this.data = this.field.division(this.data, data)

  return this
}
AlgebraElement.prototype.division = division
AlgebraElement.prototype.div      = division

function equal () {
  var data = coerceToData(arguments[0])

  return this.field.equal(this.data, data)
}
AlgebraElement.prototype.equal = equal
AlgebraElement.prototype.eq    = equal

function notEqual () {
  var data = coerceToData(arguments[0])

  return this.field.notEqual(this.data, data)
}
AlgebraElement.prototype.equal = notEqual
AlgebraElement.prototype.eq    = notEqual

module.exports = AlgebraElement

