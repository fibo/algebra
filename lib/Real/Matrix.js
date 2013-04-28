
// TODO vedi poi quali require si possono togliere
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
    , arg = arguments[0] || {}

  arg.elementConstructor = RealElement

  // Coerce elements to RealElement
  var elements = arg.elements
  arg.elements = []
  for (var i in elements) {
    var element = new RealElement(elements[i])
    arg.elements.push(element)
  }

  Matrix.call(self, arg)

  function scalarMultiplication () {
// TODO usa getElements e setElements
    var scalar = coerce.toNumber(arguments[0])

    for (var i in _elements)
      _elements[i].mul(scalar)
  }
  self.scalar               = scalarMultiplication
  self.scalarMultiplication = scalarMultiplication

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

module.exports = RealMatrix

