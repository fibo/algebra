
var algorithm   = require('../util/algorithm.js')
  , RealMatrix  = require('./Matrix.js')
  , util        = require('util')

var determinant = algorithm.determinant

function RealSquareMatrix () {
  var self = this
    , arg = arguments[0]
    , _order

  function getOrder () { return _order }
  self.getOrder = getOrder

  function setOrder () {
    var arg = arguments[0]
  // TODO da aggiustare e mettere tutti i controlli
  // tipo is.number(order)
    _order = arg
  }

  // TODO piu avanti potrei fare che il numero di elementi deve essere un quadrato e non serve
  // esplicitare l' order
  setOrder(arg.order)
  
  arg.numberOfColumns = _order
  arg.numberOfRows    = _order

  RealMatrix.call(self, arg)

  // TODO il numero di elementi deve essere un quadrato
  //if(is.notInteger(Math.sqrt(self.getElements().length)))
  //  throw new Error()
}

util.inherits(RealSquareMatrix, RealMatrix)

function realSquareMatrixDeterminant () {
  return determinant(this.getNumberOfRows(), this.getElements())
}
RealSquareMatrix.prototype.det         = realSquareMatrixDeterminant
RealSquareMatrix.prototype.determinant = realSquareMatrixDeterminant

module.exports = RealSquareMatrix

