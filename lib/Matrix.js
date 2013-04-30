
var algorithm   = require('./util/algorithm.js')
  , coerce      = require('./util/coerce.js')
  , is          = require('./util/is.js')
  , Tensor      = require('./Tensor.js')
  , util        = require('util')

var getAdjointElements        = algorithm.getAdjointElements
  , matrixToArrayIndex        = algorithm.matrixToArrayIndex
  , rowByColumnMultiplication = algorithm.rowByColumnMultiplication

function Matrix () {
  var self = this
    , arg = arguments[0] || {}
    , _numberOfColumns
    , _numberOfRows

  arg.indices = [arg.numberOfRows, arg.numberOfColumns]

  Tensor.call(self, arg)

  function getNumberOfColumns () { 
    var indices = self.getIndices()
    return indices[1]
  }
  self.getNumberOfColumns = getNumberOfColumns
  self.numCols            = getNumberOfColumns

  function getNumberOfRows () {
    var indices = self.getIndices()
    return indices[0]
  }
  self.getNumberOfRows = getNumberOfRows
  self.numRows         = getNumberOfRows

  function getElementByIndexes (i, j) {
    var index = matrixToArrayIndex(i, j, self.numCols())
    var elements = self.getElements()

    return elements[index]
  }
  self.getElementByIndexes = getElementByIndexes
  self.ij                  = getElementByIndexes

  function getRowByIndex (index) {
    var row = []

    for (var j = 0; j < self.numCols(); j++) {
      var element = self.getElementByIndexes(index, j)
      row.push(element)
    }

    return row
  }
  self.getRowByIndex = getRowByIndex
  self.row           = getRowByIndex

  function getColumnByIndex (index) {
    var column = []

    for (var i = 0; i < self.numRows(); i++) {
      var element = self.getElementByIndexes(i, index)
      column.push(element)
    }

    return column
  }
  self.col              = getColumnByIndex
  self.getColumnByIndex = getColumnByIndex

  function leftMultiplication (matrix) {
    var elements = rowByColumnMultiplication(matrix, self)
    self.setElements(elements)
  }
  self.leftMultiplication = leftMultiplication
  self.lmul               = leftMultiplication

  function rightMultiplication (matrix) {
    var elements = rowByColumnMultiplication(self, matrix)
    self.setElements(elements)
  }
  self.mul                 = rightMultiplication
  self.rightMultiplication = rightMultiplication
  self.rmul                = rightMultiplication
}

util.inherits(Matrix, Tensor)

module.exports = Matrix

