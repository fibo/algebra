
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
      data.push(_elements[i].getData())

    return data
  }
  self.getData = getData

  function getElements () { return _elements }
  self.getElements = getElements

  function getIndices () { return _indices }
  self.getIndices = getIndices

  function setElementConstructor () {

// TODO ha senso passare elementConstructor ? Per forza deve avere almeno un elemento
//   che senso ha un Tensore senza elementi, cioè vuoto?

    var elements = self.getElements()
    _elementConstructor = elements[0].constructor
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

// TODO ELement e Tensor sono due classi diverse, Tensor usa gli Element
// per le operazioni posso trattarli come casi speciali
Tensor.prototype.addition       = abstractMethod

function equal (tensor) {
// TODO check indici
var elements1 = this.getElements()
  , elements2 = tensor.getElements()

if (elements1.lenght !== elements2.lenght)
  return false

for (var i in elements1)
  if (elements1[i].notEqual(elements2[i]))
    return false

return true
}
Tensor.prototype.equal = equal

function clone () {
  return new Tensor({
    elements: this.getElements(),
    indices : this.getIndices()
  })
}
Tensor.prototype.clone = clone

Tensor.prototype.inversion      = abstractMethod
Tensor.prototype.multiplication = abstractMethod
Tensor.prototype.negation       = abstractMethod
Tensor.prototype.notEquals      = abstractMethod
Tensor.prototype.subtraction    = abstractMethod

module.exports = Tensor

