
var algorithm   = require('../util/algorithm.js')
  , coerce      = require('../util/coerce.js')
  , is          = require('../util/is.js')
  , Matrix      = require('../Matrix.js')
  , RealElement = require('./Element.js')
  , util        = require('util')

var getAdjointElements        = algorithm.getAdjointElements
  , matrixToArrayIndex        = algorithm.matrixToArrayIndex
  , rowByColumnMultiplication = algorithm.rowByColumnMultiplication

function RealMatrix () {
  var self = this
    , _elements = []
// TODO _elementContructor andrebbe nella classe padre
    , _elementContructor = RealElement
    , _numberOfColumns
    , _numberOfRows
    , parentArg = {}

  parentArg.elementConstructor = RealElement

  Matrix.apply(self, parentArg)

  function getElementContructor () { return _elementContructor }
  self.getElementContructor = getElementContructor

  function getElementByIndexes (i, j) {
    var index = matrixToArrayIndex(i, j, getNumberOfColumns())

    return _elements[index]
  }

  self.getElementByIndexes = getElementByIndexes
  self.ij                  = getElementByIndexes

  // TODO andrebbe in Matrix non qui, anzi in Tensor
  function getElements () { return _elements }
  self.getElements = getElements

  function setElements (elements) {
    if (is.array(elements))
      for (var i in elements)
        _elements[i] = new RealElement(elements[i])
  }

  setElements(arg.elements)

  function getNumberOfColumns () { return _numberOfColumns }
  self.getNumberOfColumns = getNumberOfColumns
  self.numCols            = getNumberOfColumns

  function getNumberOfRows () { return _numberOfRows }
  self.getNumberOfRows = getNumberOfRows
  self.numRows         = getNumberOfRows

  function scalarMultiplication () {
    var scalar = coerce.toNumber(arguments[0])

    for (var i in _elements)
      _elements[i].mul(scalar)
  }
  self.scalar               = scalarMultiplication
  self.scalarMultiplication = scalarMultiplication

  function getRowByIndex (rowIndex) {
    var row = []
    
    for (var j = 0; j < self.numCols(); j++) {
      var element = self.ij(rowIndex, j)
      row.push(element)
    }

    return row
  }
  self.getRowByIndex = getRowByIndex
  self.row           = getRowByIndex

  function getColumnByIndex (colIndex) {
    var column = []

    for (var i = 0; i < self.numRows(); i++) {
      var element = self.ij(i, colIndex)
      column.push(element)
    }

    return column
  }
  self.col              = getColumnByIndex
  self.getColumnByIndex = getColumnByIndex

  function rightMultiplication (matrix) {
    _elements = rowByColumnMultiplication(self, matrix)
  }
  self.mul                 = rightMultiplication
  self.rightMultiplication = rightMultiplication
  self.rmul                = rightMultiplication

  // TODO rightMultiplication leftMultiplication in mxn matrix
  function leftMultiplication (matrix) {
    // TODO dovrei poter passare un array di matrici, cioè fare tipo
    // for (var i in arguments) _elements = rowByColumnMultiplication(arguments[i], self)
    _elements = rowByColumnMultiplication(matrix, self)
  }
  self.leftMultiplication = leftMultiplication
  self.lmul               = leftMultiplication

  function toString () {
    var str = ''

    for (var i = 0; i < self.numRows(); i++) {
      str += '|'

      for (var j = 0; j < self.numCols(); j++) {
        str += ' ' + self.ij(i, j).num() + ' '
      }

      str += '|\n'
    }

    return str
  }
  self.toString = toString
}


util.inherits(RealMatrix, Matrix)

module.exports = Matrix

