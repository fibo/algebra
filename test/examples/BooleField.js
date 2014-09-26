//
//var algebra  = require('algebra')
//  , inherits = require('inherits')
//
//var AlgebraField = algebra.AlgebraField
//
///**
// * Boolean Algebra
// */
//
//function BooleField () {
//  var zero = false
//    , one = true
//
//  this.addition       = function (a, b) { return (a + b) % 2 }
//  this.subtraction    = function (a, b) { return (a - b) % 2 }
//  this.multiplication = function (a, b) { return (a * b) % 2 }
//  this.division       = function (a, b) { return (a / b) % 2 }
//  this.equal          = function (a, b) { return a === b }
//  this.contains       = function (a) { return typeof a === "boolean" }
//
//  AlgebraField.call(this, zero, one)
//}
//
//inherits(BooleField, AlgebraField)
//
//module.exports = BooleField
//
