
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

  self.contains = operators.contains

  var byAddition = operators.addition
    , bySubtraction = operators.subtraction
    , byMultiplication = operators.multiplication
    , byEqual = operators.equal
  
  /**
   * Static addition operator 
   */
  
  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(byAddition)        
  }

  self.addition = fieldAddition
    
  /**
   * Static subtraction operator 
   */
  
  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(bySubtraction)        
  }

  self.subtraction = fieldSubtraction
    
  /**
   * Static multiplication operator 
   */
  
  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(byMultiplication)        
  }

  self.multiplication = fieldMultiplication

  /**
   * Static equal operator 
   */
  
  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(byEqual)        
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
