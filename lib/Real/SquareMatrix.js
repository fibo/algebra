
var algorithm   = require('../util/algorithm.js')
  , RealMatrix  = require('./Matrix.js')
  , util        = require('util')

var determinant = algorithm.determinant

function RealSquareMatrix () {
  var self = this
    , arg = arguments[0]
    , parentArgs = {}

  parentArg.numberOfColumns = arg.order
  parentArg.numberOfRows    = arg.order
  
  RealMatrix.call(self, parentArg)

  function realSquareMatrixDeterminant () {
    return determinant(self.getNumberOfRows(), self.getElements())
  }
  self.det         = realSquareMatrixDeterminant
  self.determinant = realSquareMatrixDeterminant
}

util.inherits(RealSquareMatrix, RealMatrix)

module.exports = RealSquareMatrix

