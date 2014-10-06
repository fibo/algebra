
var inherits = require('inherits')

var arrayFrom = require('./arrayFrom')
  , Element = require('./Element')
  , toData = require('./toData')

/**
 * Algebra field
 *
 * @param {Any} zero
 * @param {Any} one
 * @param {Object} operators
 */

function Field (zero, one, operators) {
  var self = this

  self.zero = zero
  self.one = one


  var addition = operators.addition
    , multiplication = operators.multiplication
    , inversion = operators.inversion
    , equal = operators.equal
    , negation = operators.negation
    , contains = operators.contains
  
  self.contains = contains

  function subtraction (data1, data2) {
    return addition(data1, negation(data2))
  }

  function notEqual (data1, data2) {
    return (! (operators.equal(data1, data2)))
  }

  function division (data1, data2) {
    return multiplication(data1, inversion(data2))
  }

  function checkIsNotZero (data) {
    if (equal(zero, data))
      throw new TypeError(data)

    return data
  }

  /**
   * Static addition operator 
   */
  
  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(addition)        
  }

  self.addition = fieldAddition
    
  /**
   * Static subtraction operator 
   */
  
  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(subtraction)        
  }

  self.subtraction = fieldSubtraction
    
  /**
   * Static multiplication operator 
   */
  
  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(multiplication)        
  }

  self.multiplication = fieldMultiplication

  /**
   * Static division operator 
   */
  
  function fieldDivision () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(division)        
  }

  self.division = fieldDivision

  /**
   * Static inversion operator 
   */
  
  function fieldInversion () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(inversion)        
  }

  self.inversion = fieldInversion

  /**
   * Static equal operator 
   */
  
  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(equal)        
  }

  self.equal = fieldEqual

  /**
   * Static negation operator 
   */
  
  function fieldNegation () {
    return operators.negation(toData(arguments[0]))  
  }

  self.negation = fieldNegation
    
  /**
   * Scalar element
   * 
   * @param {Any} data
   * 
   * @return {Object} this
   */ 
  
  function Scalar (data) {
    Element.call(this, data, self.contains)
  }

  inherits(Scalar, Element)

  function scalarAddition () {
    this.data = fieldAddition(this.data, fieldAddition.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.addition = scalarAddition

  function scalarSubtraction () {
    this.data = fieldSubtraction(this.data, fieldSubtraction.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.subtraction = scalarSubtraction

  function scalarMultiplication () {
    this.data = fieldMultiplication(this.data, fieldMultiplication.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.multiplication = scalarMultiplication
  Scalar.prototype.mul = scalarMultiplication

  function scalarDivision () {
    this.data = fieldDivision(this.data, fieldDivision.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.division = scalarDivision
  Scalar.prototype.div = scalarDivision

  function scalarInversion () {
    this.data = fieldInversion(this.data, fieldInversion.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.inversion = scalarInversion
  Scalar.prototype.inv       = scalarInversion

  function scalarEqual () {
    return fieldEqual(this.data, fieldEqual.apply(null, arguments))
  }
  
  Scalar.prototype.equal = scalarEqual
  Scalar.prototype.eq = scalarEqual

  function scalarNegation () {
    this.data = fieldNegation(this.data)
    
    return this
  }
  
  Scalar.prototype.negation = scalarNegation
  Scalar.prototype.neg = scalarNegation

  self.Scalar = Scalar
}

module.exports = Field

