
//
// # AlgebraMatrix
//

var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

function matrixToArrayIndex (i, j, numberOfColumns) {
  return i * numberOfColumns + j
}

function AlgebraMatrix (Element, dimensionArray, elements) {

  var self = this

  //
  // ## Attributes
  //

  //
  // ### elements
  //

  if (! (_.isArray(elements)))
    throw new TypeError()

  //
  // ### numberOfColumns
  //

  function getNumberOfColumns () {
    return dimensionArray[0]
  }

  Object.defineProperty(this, 'numberOfColumns', {get: getNumberOfColumns})

  //
  // ### numberOfRows
  //

  function getNumberOfRows () {
    return dimensionArray[1]
  }

  Object.defineProperty(this, 'numberOfRows', {get: getNumberOfRows})

  AlgebraTensor.call(this, Element, dimensionArray, elements)
}

inherits(AlgebraMatrix, AlgebraTensor)

//
// ## Methods
//

function rowByColumnMultiplication (leftMatrix, rightMatrix) {

  var rNumRows = rightMatrix.numberOfRows
    , lNumCols = leftMatrix.numberOfColumns

  if (lNumCols !== rNumRows)
    throw new Error()

  var elements = []
    , Element  = leftMatrix.Element
    , field    = leftMatrix.field


  for (var i = 0; i < lNumCols; i++) {
    for (var j = 0; j < rNumRows; j++) {
      var element = new Element(0)

      for (var k = 0; k < lNumCols; k++) {
        /* TODO funzione generica di somma sugli indici, tipo notazione di Einstein.
        var rightElement = leftMatrix.ij(i, k);
        var leftElement = rightMatrix.ij(k, j);
        */
        var rightElementData = leftMatrix.data[matrixToArrayIndex(i, k, rightMatrix.numberOfColumns)]
          , leftElementData = rightMatrix.data[matrixToArrayIndex(k, j, lNumCols)]

        element.add(field.mul(rightElementData,leftElementData))
      }

      elements.push(element)
    }
  }

  return elements
}

//
// ### multiplication
//

function multiplication (matrix) {
  var newElements = rowByColumnMultiplication(this, matrix)

  this.elements = newElements

  return this
}

AlgebraMatrix.prototype.multiplication = multiplication
AlgebraMatrix.prototype.mul            = multiplication

module.exports = AlgebraMatrix

