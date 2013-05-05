
var algorithm   = require('../util/algorithm.js')
  , is          = require('../util/is.js')
  , RealMatrix  = require('./Matrix.js')
  , util        = require('util')

var determinant = algorithm.determinant

function RealSquareMatrix () {
  var self = this
    , arg = arguments[0]
    , _order

  if (is.notArray(arg))
    throw new Error()

  function getOrder () { return _order }
  self.getOrder = getOrder

  function setOrder () {
    var arg = arguments[0]

    var order = Math.sqrt(arg.length)

    if(is.notInteger(order))
      throw new Error()
  
    _order = order
  }
  setOrder(arg)
  
  RealMatrix.call(self, {
    numberOfColumns : _order,
    numberOfRows    : _order,
    elements        : arg
  })
}

util.inherits(RealSquareMatrix, RealMatrix)

function realSquareMatrixDeterminant () {
  return determinant(this.getNumberOfRows(), this.getElements())
}
RealSquareMatrix.prototype.det         = realSquareMatrixDeterminant
RealSquareMatrix.prototype.determinant = realSquareMatrixDeterminant

module.exports = RealSquareMatrix

