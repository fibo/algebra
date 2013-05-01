
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

  function getElementConstructor () {
    var elements = self.getElements()
    return elements[0].constructor
  }
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
  setIndices(arg.indices)
}

// TODO addition e subtraction si può fare solo tra tensori con indici uguali
// quindi per gli elementi è sempre possibile, per i vettori e le matrici bisogna fare il controllo sugli indici

// TODO ELement e Tensor sono due classi diverse, Tensor usa gli Element
// per le operazioni posso trattarli come casi speciali

function addition () {
  var tensor1 = this
    , tensor2 = arguments[0]
    , elements = []

  if (! hasSameIndices(tensor1, tensor2))
    return // TODO Error

  var elements1 = tensor1.getElements()
    , elements2 = tensor2.getElements()

  for (var i in elements)
    elements.push(elements1[i].addition(elements2[i]))

  tensor1.setElements(elements)

  return tensor1
}
Tensor.prototype.addition = addition
Tensor.prototype.add      = addition

function clone () {
  return new Tensor({
    elements: this.getElements(),
    indices : this.getIndices()
  })
}
Tensor.prototype.clone = clone

// TODO hasEqualElements e vedi come puoi sistemare
function hasSameIndices (tensor1, tensor2) {
  var indices1  = tensor1.getIndices()
    , indices2  = tensor2.getIndices()
  
  if (indices1.lenght !== indices2.lenght)
    return false
  
  for (var i in indices1)
    if (indices1[i] !== indices2[i])
      return false

  return true
}

function equal () {
  var tensor1 = this
    , tensor2 = arguments[0]

  if (! hasSameIndices(tensor1, tensor2))
    return false
 
   // Check elements
  var elements1 = tensor1.getElements()
    , elements2 = tensor2.getElements()
  
  if (elements1.lenght !== elements2.lenght)
    return false
  
  for (var i in elements1)
    if (elements1[i].notEqual(elements2[i]))
      return false

  // Finally
  return true
}
Tensor.prototype.equal = equal
Tensor.prototype.eq    = equal

Tensor.prototype.inversion      = abstractMethod
Tensor.prototype.multiplication = abstractMethod
Tensor.prototype.negation       = abstractMethod

function notEqual () {

}
Tensor.prototype.ne       = notEqual
Tensor.prototype.notEqual = notEqual

function subtraction () {
  var tensor1 = this
    , tensor2 = arguments[0]
    , elements = []

  if (! hasSameIndices(tensor1, tensor2))
    return // TODO Error

  var elements1 = tensor1.getElements()
    , elements2 = tensor2.getElements()

  for (var i in elements)
    elements.push(elements1[i].subtraction(elements2[i]))

  tensor1.setElements(elements)

  return tensor1
}
Tensor.prototype.subtraction = subtraction
Tensor.prototype.sub         = subtraction

module.exports = Tensor

