
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
    return this.computeDeterminant(order, Element, self.elements)
  }

  // TODO se il determinante è zero throw new Error()
  Object.defineProperty(this, 'determinant', {get: getDeterminant})

}

inherits(AlgebraInvertibleMatrix, AlgebraMatrix)

function computeDeterminant (order, Element, elements) {

  var det = new Element(0)

  // cloning elements
  for (var i in elements)
    elements[i] = elements[i].clone()

  // TODO caso degenere, aggiusta
  if (order === 1)
    return elements[0]

  if (order === 2) {
    det.add(elements[0].mul(elements[3])).sub(elements[2].mul(elements[1]))
    return det
  }

  // TODO per ora scelgo sempre la prima riga.
  // TODO classe Collection con metodo countZeros o numberOfZeros()
  var rowIndex = 0

  for (var columnIndex = 0; columnIndex < order; columnIndex++) {
    var adjointElements = getAdjointElements(rowIndex, columnIndex, order, order, elements)

    var adjointDeterminant = this.computeDeterminant(order - 1, adjointElements);

    element = elements[this.computeIndex([rowIndex, columnIndex])];

    if (columnIndex % 2 === 0)
      det.add(element)
    else
      det.sub(element)

    det.mul(adjointDeterminant)
  }

  return det
}

AlgebraInvertibleMatrix.prototype.computeDeterminant = computeDeterminant

function getAdjointElements(rowIndex, columnIndex, numRows, numCols, elements) {
  var adjointElements = []

  // TODO anche qua dovrei clonare in teoria ?
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        if (i != rowIndex && j != columnIndex) {
          adjointElements.push(elements[this.computeIndex([i, j])])
        }
      }
    }

  return adjointElements
}

module.exports = AlgebraInvertibleMatrix

