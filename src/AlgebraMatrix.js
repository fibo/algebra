
var AlgebraVector = require('./AlgebraVector')

function matrixToArrayIndex (i, j, numberOfColumns) {
  return i * numberOfColumns + j
}

/**
 * Abstract matrix
 *
 * @param {Object} space instance of AlgebraMatrixSpace
 * @param {Array} elements
 */

function AlgebraMatrix (space, elements) {
  this.space = space
  this.elements = elements

  function getNumberOfColumns () {
    return space.numberOfColumns
  }

  Object.defineProperty(this, 'numberOfColumns', {get: getNumberOfColumns})

  function getNumberOfRows () {
    return space.numberOfRows
  }

  Object.defineProperty(this, 'numberOfRows', {get: getNumberOfRows})
}

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

