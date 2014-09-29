
var arrayFrom = require('./arrayFrom')

function Field (zero, one, operators) {
  var self = this
  self.zero = zero
  self.one = one

  self.contains = operators.contains
  
  /**
   * Extract data attribute, if any, and check if it belongs to the Field set
   * 
   * @param {Object|Any} arg
   * 
   * @return {Any} data
   */

  function toData (arg) {
    var data
  
    if (typeof arg.data === 'undefined')
      data = arg 
    else
      data = arg.data
  
    if (self.contains(data))
      return data
    else
      throw new TypeError(data)
  }

  var byAddition = operators.addition
    , bySubtraction = operators.subtraction
    , byMultiplication = operators.multiplication
  
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
   * Scalar element
   * 
   * @param {Any} data
   * 
   * @return {Object} this
   */ 
  
  function Scalar (data) {
    this.data = data
  }

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

  self.Scalar = Scalar
}

module.exports = Field
