
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

  // TODO provvisorio, in realtà dovrei usare gli indici dei tensori
  _numberOfColumns = arg.numberOfColumns
  _numberOfRows = arg.numberOfRows

  Tensor.call(self, arg)

  function getNumberOfColumns () { return _numberOfColumns }
  self.getNumberOfColumns = getNumberOfColumns
  self.numCols            = getNumberOfColumns

  function getNumberOfRows () { return _numberOfRows }
  self.getNumberOfRows = getNumberOfRows
  self.numRows         = getNumberOfRows

  // TODO dovrebbe stare in Tensor
  function getElementByIndexes (i, j) {
    var index = matrixToArrayIndex(i, j, getNumberOfColumns())
    var elements = self.getElements()

    return elements[index]
  }
  self.getElementByIndexes = getElementByIndexes
  self.ij                  = getElementByIndexes

  function getRowByIndex () {
    var arg = arguments[0]
      , row = []
      , rowIndex

    rowIndex = arg

    for (var j = 0; j < self.numCols(); j++) {
      var element = self.getElementByIndexes(rowIndex, j)
      row.push(element)
    }

    return row
  }
  self.getRowByIndex = getRowByIndex
  self.row           = getRowByIndex

  function getColumnByIndex (colIndex) {
    var column = []

    for (var i = 0; i < self.numRows(); i++) {
      var element = self.getElementByIndexes(i, colIndex)
      column.push(element)
    }

    return column
  }
  self.col              = getColumnByIndex
  self.getColumnByIndex = getColumnByIndex

  function rightMultiplication (matrix) {
var e
e = matrix.getElements()
for (var i in e) console.log(e[i].getData());
    var elements = rowByColumnMultiplication(self ,matrix)
for (var i in elements) console.log(elements[i].getData());
    self.setElements(elements)
e = matrix.getElements()
for (var i in e) console.log(e[i].getData());
  }
  self.mul                 = rightMultiplication
  self.rightMultiplication = rightMultiplication
  self.rmul                = rightMultiplication

  function leftMultiplication (matrix) {
    // TODO dovrei poter passare un array di matrici, cioè fare tipo
    // for (var i in arguments) _elements = rowByColumnMultiplication(arguments[i], self)
    var elements = rowByColumnMultiplication(matrix, self)
    self.setElements(elements)
  }
  self.leftMultiplication = leftMultiplication
  self.lmul               = leftMultiplication
}

util.inherits(Matrix, Tensor)

module.exports = Matrix

