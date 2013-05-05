
var algorithm        = require('../util/algorithm.js')
  , coerce           = require('../util/coerce.js')
  , is               = require('../util/is.js')
  , RealField        = require('./Field.js')
  , RealElement      = require('./Element.js')
  , RealSquareMatrix = require('./SquareMatrix.js')
  , util             = require('util')

var determinant = algorithm.determinant

var R = new RealField()

function RealGeneralLinearGroup (order) {
  var self = this
    , _order

  function getOrder () { return _order }
  self.getOrder = getOrder

  function setOrder (order) {
    if (is.notPositiveInteger(order))
      throw new Error()

    _order = order
  }
  setOrder(order)

  function Matrix () {
    var argumentsAreValid = (arguments.length == _order * _order)

    if (!argumentsAreValid)
      throw new Error()

    var arg = {}

    var elements = []

    for (var i in arguments) {
      var element = new RealElement(arguments[i])
      elements.push(element)
    }

    if (determinant(_order, elements).isZero())
// da mettere in una classe Exception DeterminantIsZero
      throw new Error()

    RealSquareMatrix.call(this, elements)
  }
  util.inherits(Matrix, RealSquareMatrix)
  self.Matrix = Matrix

  function Identity() {
	  //TODO aggiusta
    return new Matrix()
  }
  self.Id       = Identity
  self.Identity = Identity
}

module.exports = RealGeneralLinearGroup

