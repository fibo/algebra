
/**
 * Convert arguments to array
 *
 * ```
 * function () {
 *   console.log(typeof arguments) // object
 *
 *   var args = arrayFrom(arguments)
 *
 *   console.log(typeof args) // array
 * }
 * ```
 *
 * @param {Object} arguments of a function
 *
 * @return {Array} array of arguments
 */

function arrayFrom () {
  return (function arraySlice0 () {
    return Array.prototype.slice.call(arguments, 0)
  }).apply(null, arguments[0])
}

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
  
  Scalar.prototype.addition = scalarAddition

  self.Scalar = Scalar
}

module.exports = Field
