
var inherits = require('inherits')

var arrayFrom = require('./arrayFrom')
  , AbstractElement = require('./Element')
  , toData = require('./toData')

/**
 * Abstract multidimensional space
 *
 * @param {Object} Scalar
 * @param {Array} indices
 *
 * @constructor
 */

function Space (Scalar, indices) {
  var self = this

  var zero = []
    , one = []

  self.dimension = indices.reduce(function (a, b) { return a * b }, 1)

  function contains (data) {
    return data.map(Scalar.contains).length === self.dimension
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
    return getResult(Scalar.addition, arrayFrom(arguments).map(toData))
  }

  self.addition = spaceAddition
  self.add = spaceAddition


  function spaceSubtraction () {
    return getResult(Scalar.subtraction, arrayFrom(arguments).map(toData))
  }

  self.subtraction = spaceSubtraction

  /**
   *
   * @param {Array} data
   */

  function Element (data) {
    AbstractElement.call(this, data, self.contains)
  }

  inherits(Element, AbstractElement)

  function elementAddition () {
    this.data = spaceAddition(this.data, spaceAddition.apply(null, arguments))

    return this 
  }

  Element.prototype.addition = elementAddition
  Element.prototype.add = elementAddition

  self.Element = Element

}

module.exports = Space

