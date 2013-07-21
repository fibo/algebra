
var AlgebraField = require('./AlgebraField')

function AlgebraElement(data, field) {
    this.data = data

    this.__defineGetter__('field', function () {
      return field
    })
}

function addition(element) {
  this.data = this.field.addition(this.data, element.data)
  return this
}
AlgebraElement.prototype.addition = addition
AlgebraElement.prototype.add      = addition

function subtraction(element) {
  this.data = this.field.subtraction(this.data, element.data)
  return this
}
AlgebraElement.prototype.subtraction = subtraction
AlgebraElement.prototype.sub         = subtraction

function multiplication(element) {
  this.data = this.field.multiplication(this.data, element.data)
  return this
}
AlgebraElement.prototype.multiplication = multiplication
AlgebraElement.prototype.mul            = multiplication

function division(element) {
  this.data = this.field.division(this.data, element.data)
  return this
}
AlgebraElement.prototype.division = division
AlgebraElement.prototype.div      = division

function equal(element) {
    return this.field.equal(this.data, element.data)
}
AlgebraElement.prototype.equal = equal
AlgebraElement.prototype.eq    = equal

function notEqual(element) {
    return this.field.notEqual(this.data, element.data)
}
AlgebraElement.prototype.equal = notEqual
AlgebraElement.prototype.eq    = notEqual

module.exports = AlgebraElement

