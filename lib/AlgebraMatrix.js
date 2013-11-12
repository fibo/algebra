
var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

function matrixToArrayIndex (i, j, numberOfColumns) {
  return i * numberOfColumns + j
}

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


function getDeterminant () {
  var order = getNumberOfRows()

  return computeDeterminant(order, Element, self.elements)
}

  Object.defineProperty(this, 'determinant', {get: getDeterminant})
}

inherits(AlgebraMatrix, AlgebraTensor)

// TODO deve andare in AlgebraInvertibleMatrix

function computeDeterminant (order, Element, elements) {

  var det = new Element(0)

  // TODO clono gli elementi
  var _elements = []
    , element

  for (var i in elements) {
    element = new Element(elements[i].data)

    _elements.push(element)
  }

  // TODO caso degenere, aggiusta
  if (order === 1)
    return _elements[0]

  if (order === 2) {
    det.add(_elements[0].mul(_elements[3])).sub(_elements[2].mul(_elements[1]))
    return det
  }

  // TODO per ora scelgo sempre la prima riga.
  // TODO classe Collection con metodo countZeros o numberOfZeros()
  var rowIndex = 0

  for (var columnIndex = 0; columnIndex < order; columnIndex++) {
    var adjointElements = getAdjointElements(rowIndex, columnIndex, order, order, _elements)

    var adjointDeterminant = computeDeterminant(order - 1, adjointElements);

    element = _elements[matrixToArrayIndex(rowIndex, columnIndex, order)];

    if (columnIndex % 2 === 0) {
      det.add(element)
    }
    else {
      det.sub(element)
    }

    det.mul(adjointDeterminant)
  }

  return det
}

function getAdjointElements(rowIndex, columnIndex, numRows, numCols, elements) {
  var adjointElements = []

  // TODO anche qua dovrei clonare in teoria ?
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        if (i != rowIndex && j != columnIndex) {
          adjointElements.push(elements[matrixToArrayIndex(i, j, numCols)])
        }
      }
    }

  return adjointElements
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
        // TODO funzione generica di somma sugli indici, tipo notazione di Einstein.
        //var rightElement = leftMatrix.ij(i, k);
        //var leftElement = rightMatrix.ij(k, j);
        var rightElementData = leftMatrix.data[matrixToArrayIndex(i, k, rightMatrix.numberOfColumns)]
          , leftElementData = rightMatrix.data[matrixToArrayIndex(k, j, lNumCols)]

        element.add(field.mul(rightElementData,leftElementData))
      }

      elements.push(element)
    }
  }

  return elements
}

function multiplication (matrix) {
  var newElements = rowByColumnMultiplication(this, matrix)

  this.elements = newElements

  return this
}

AlgebraMatrix.prototype.multiplication = multiplication
AlgebraMatrix.prototype.mul            = multiplication

module.exports = AlgebraMatrix

