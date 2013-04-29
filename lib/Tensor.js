
var abstractMethod = require('./util/abstractMethod.js')
  , Element        = require('./Element.js')
  , is             = require('./util/is.js')
  , util           = require('util')

function Tensor () {
  var self = this
    , arg = arguments[0] || {}
    , _elementConstructor
    , _elements = []
    , _indices = [0]

  function getElementConstructor () { return _elementConstructor }
  self.getElementConstructor = getElementConstructor

  function getData () {
    var data = []

    for (var i in _elements)
      data.push(_elements.getData())

    return data
  }
  self.getData = getData

  function getElements () { return _elements }
  self.getElements = getElements

  function getIndices () { return _indices }
  self.getIndices = getIndices

  function setElementConstructor () {
    var arg = arguments[0]

    // TODO check type is.function
    _elementConstructor = arg
  }

  function setElements () {
    var arg = arguments[0]

    if (is.array(arg))
      _elements = arg
    // TODO if (element instanceof Element)
    // TODO check indices and elements.lenght
  }
  self.setElements = setElements

  function setIndices () {
    var arg = arguments[0]

    if (is.array(arg))
      _indices = arg
  }

  setElements(arg.elements)
  setElementConstructor(arg.elementConstructor)
  setIndices(arg.indices)
}

//-----------------------------------------------------------------------------

// TODO addition e subtraction si può fare solo tra tensori con indici uguali
// quindi per gli elementi è sempre possibile, per i vettori e le matrici bisogna fare il controllo sugli indici
Tensor.prototype.addition       = abstractMethod
Tensor.prototype.equals         = abstractMethod
Tensor.prototype.clone          = abstractMethod
Tensor.prototype.getElements    = abstractMethod
Tensor.prototype.inversion      = abstractMethod
Tensor.prototype.multiplication = abstractMethod
Tensor.prototype.negation       = abstractMethod
Tensor.prototype.notEquals      = abstractMethod
Tensor.prototype.subtraction    = abstractMethod

module.exports = Tensor

