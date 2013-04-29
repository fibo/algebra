
var coerce = require('../util/coerce.js')
  , Element = require('../Element.js')
  , is = require('../util/is.js')
  , util = require('util')

function RealElement () {
  var self = this
    , arg  = arguments[0]
    , num  = 0

  if (is.elementWithNumberDataType(arg))
    num = arg.getData()

  if (is.number(arg))
    num = arg

  Element.call(self, {data: num})

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

function equal () {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  return (num1 === num2)
}
RealElement.prototype.equal = equal
RealElement.prototype.eq    = equal

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

function isNotOne () {
  return this.notEqual(1)
}
RealElement.prototype.isNotOne = isNotOne
RealElement.prototype.not1      = isNotOne

function isNotZero () {
  return this.notEqual(0)
}
RealElement.prototype.isNotZero = isNotZero
RealElement.prototype.not0      = isNotZero

function isOne () {
  return this.equal(1)
}
RealElement.prototype.isOne = isOne
RealElement.prototype.is1   = isOne

function isZero() {
  return this.equal(0)
}
RealElement.prototype.isZero = isZero
RealElement.prototype.is0    = isZero

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

function notEqual() {
  var arg = arguments[0]
    , num1 = this.getData()
    , num2 = coerce.toNumber(arg)
  return (num1 != num2)
}
RealElement.prototype.notEqual = notEqual
RealElement.prototype.ne       = notEqual

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

