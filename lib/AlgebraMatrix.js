
var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

function AlgebraMatrix (Element, dimensionArray, elements) {

  var self = this

  // elements

  if (! (_.isArray(elements)))
    throw new TypeError()

  // numberOfColumns

  function getNumberOfColumns () {
    return dimensionArray[0]
  }

  Object.defineProperty(this, 'numberOfColumns', {get: getNumberOfColumns})

  // numberOfRows

  function getNumberOfRows () {
    return dimensionArray[1]
  }

  Object.defineProperty(this, 'numberOfRows', {get: getNumberOfRows})

  // inheritance

  AlgebraTensor.call(this, Element, dimensionArray, elements)

}

inherits(AlgebraMatrix, AlgebraTensor)

function multiplication (matrix) {
  var newElements = rowByColumnMultiplication(this, matrix)

  this.elements = newElements

  return this
}

AlgebraMatrix.prototype.multiplication = multiplication
AlgebraMatrix.prototype.mul            = multiplication

module.exports = AlgebraMatrix

