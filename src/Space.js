
var arrayFrom = require('./arrayFrom')

function Space (field, indices) {
  var self = this
  
  var zero = []
    , one = []
  
  self.dimension = indices.reduce(function (a, b) { return a * b }, 1)
  
  function toData (arg) {
    var data
  
    if (typeof arg.data === 'undefined')
      data = arg 
    else
      data = arg.data
  
    if (data.length !== self.dimension)
      throw new TypeError(data)
      
    // Throws TypeError if data is not contained in field
    data.map(field.contains)
    
    return data
  }
  
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
    
  function Element (data) {
    this.data = data
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
