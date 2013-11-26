
var AlgebraMatrix = require('./AlgebraMatrix')
  , inherits      = require('inherits')
  , _             = require('underscore')


function AlgebraInvertibleMatrix (Element, order, elements) {

  var self = this

  // order

  function getOrder () {
    return order
  }

  Object.defineProperty(this, 'order', {get: getOrder})

  // inheritance

  AlgebraMatrix.call(this, Element, [order, order], elements)

  function getDeterminant () {
    return computeDeterminant(order, Element, self.elements)
  }

  // TODO se il determinante è zero throw new Error()
  Object.defineProperty(this, 'determinant', {get: getDeterminant})

}

inherits(AlgebraInvertibleMatrix, AlgebraMatrix)

  // TODO questo è anche in AlgebraMatrix
  // la figata sarebbe generalizzarlo ai tensori
function matrixToArrayIndex (i, j, numberOfColumns) {
  return i * numberOfColumns + j
}

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

module.exports = AlgebraInvertibleMatrix

