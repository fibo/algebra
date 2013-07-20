
var AlgebraField = require('./AlgebraField')
  , util         = require('util')

function RealField() {
  this.one = 1
  this.zero = 0
}

util.inherits(RealField, AlgebraField)

function addition(a, b) {
  return a + b
}
RealField.prototype.addition = addition
RealField.prototype.add      = addition

function subtraction(a, b) {
  return a - b
}
RealField.prototype.subtraction = subtraction
RealField.prototype.sub         = subtraction

function equal(a, b) {
  return a === b
}
RealField.prototype.equal = equal
RealField.prototype.eq    = equal

module.exports = RealField

