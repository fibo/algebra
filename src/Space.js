
var arrayFrom = require('./arrayFrom')
  , toData = require('./toData')

/**
 * Abstract multidimensional space
 *
 * @param {Object} field
 * @param {Array} indices
 *
 * @constructor
 */

function Space (field, indices) {
  var self = this

  var zero = []
    , one = []

  self.dimension = indices.reduce(function (a, b) { return a * b }, 1)

  function contains (data) {
    return data.map(field.contains).length === self.dimension
  }

  self.contains = contains

  function getResult (operator, data) {
    var result = data[0]
    
    for (var i=1; i < data.length; i++) {
      for (var j=0; j < self.dimension; j++) {
        result[j] = operator(result[j], data[i][j])
      }
    }
    
    return result
  }
    
  function spaceAddition () {
    return getResult(field.addition, arrayFrom(arguments).map(toData))
  }
  
  self.addition = spaceAddition
  self.add = spaceAddition
  
      
  function spaceSubtraction () {
    return getResult(field.subtraction, arrayFrom(arguments).map(toData))
  }
  
  self.subtraction = spaceSubtraction
  
  /**
   * 
   * @param {Array} data
   */
    
  // TODO Element and Scala has the same code
  function Element (data) {
    if (self.contains(data))
      this.data = data
    else
      throw new TypeError(data)
  }
  
  function elementAddition () {
    this.data = spaceAddition(this.data, spaceAddition.apply(null, arguments))
    
    return this 
  }
  
  Element.prototype.addition = elementAddition
  Element.prototype.add = elementAddition
  
  self.Element = Element
  
}

module.exports = Space

