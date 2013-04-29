
var coerce = require('../util/coerce.js')
  , Element = require('../Element.js')
  , is = require('../util/is.js')
  , util = require('util')

function RealElement () {
  var self = this
  var arg = arguments[0] || {}
    , num = 0

  if (is.elementWithNumberDataType(arg))
    num = arg.getData()

  arg.data = num

  Element.call(self, arg)

  self.num = self.getData
}

util.inherits(RealElement, Element)

function addition () {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  this.setData(num1 + num2)
  return this
}
RealElement.prototype.addition = addition
RealElement.prototype.add      = addition

function clone () {
  return new RealElement(this.getData())
}
RealElement.prototype.clone = clone

function division () {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  this.setData(num1 / num2)
  return this
}
RealElement.prototype.division = division
RealElement.prototype.div      = division

function equals () {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  return (num1 === num2)
}
RealElement.prototype.equals = equals
RealElement.prototype.eq     = equals

function exponentiation () {
  var arg = arguments[0]
    , num = this.getData()
  this.setData(Math.exp(num))
  return this
}
RealElement.prototype.exponentiation = exponentiation
RealElement.prototype.exp            = exponentiation

function logarithm () {
  var num = this.getData()
  this.setData(Math.log(num))
  return this
}
RealElement.prototype.logarithm = logarithm
RealElement.prototype.log       = logarithm

function inversion () {
  var num = this.getData()
  this.setData(1 / num)
  return this
}
RealElement.prototype.inversion = inversion
RealElement.prototype.inv       = inversion

function isNotZero () {
  return this.notEquals(0)
}
RealElement.prototype.isNotZero = isNotZero

function isOne () {
  return this.equals(1)
}
RealElement.prototype.isOne = isOne

function isZero() {
  return this.equals(0)
}
RealElement.prototype.isZero = isZero

function multiplication () {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  this.setData(num1 * num2)
  return this
}
RealElement.prototype.multiplication = multiplication
RealElement.prototype.mul            = multiplication

function negation () {
  var num = this.getData()
  this.setData(0 - num)
  return this 
}
RealElement.prototype.negation = negation
RealElement.prototype.neg      = negation

function notEquals() {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  return (num1 != num2)
}
RealElement.prototype.notEquals = notEquals
RealElement.prototype.ne        = notEquals

function subtraction () {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  this.setData(num1 - num2)
  return this
}
RealElement.prototype.subtraction = subtraction
RealElement.prototype.sub         = subtraction

module.exports = RealElement

