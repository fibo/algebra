
var is     = require('./util/is.js')
  , Tensor = require('./Tensor.js')
  , util   = require('util')

function Vector () {
  var self = this
    , arg = arguments[0] || {}
    , _space     = null

  // TODO if (_space)
  //  _dimension = _space.getDim()

  arg.indices = [arg.elements.lenght]

  Tensor.call(self, arg)

  function dotProduct (vector) {
    var scalar = self.getElement(0).clone()

    for (var i in self.getDim())
      scalar.add(scalar.mul(vector.getElement(i)))

    return scalar
  }
  self.dotProduct = dotProduct
  self.dot        = dotProduct

  function getDimension () {
    var indices = self.getIndices()
    return indices[0]
  }
  self.dim          = getDimension
  self.getDimension = getDimension
  self.getDim       = getDimension

  function getElement (index) {
    var elements = self.getElements()
    return elements[index]
  }
  self.getElement = getElement

  function orthogonal (vector) {
    return self.dot(vector).isZero()
  }
  self.orthogonal = orthogonal
  self.ortho      = orthogonal

  function scalarMultiplication (scalar) {
    // TODO dovrebbe stare in Tensor
    var elements = self.getElements()

    for (var i in elements)
      elements[i].mul(scalar)

    self.setElements(elements)

    return self
  }
  self.scalarMultiplication = scalarMultiplication
  self.scalar               = scalarMultiplication

  // TODO  ma dovrei fare TensorSpace, dove di default è null
  // che vuol dire base e0 e1 e2 ... en
  //_space = arg.space
  //function getSpace () {
  //  return _space
  //}
  //self.getSpace = getSpace

/*
  if (_dimension === 3) {
    self.cross = function (vector) {
      var field = _space.getField();

      var a1 = self.getElement(0);
      var a2 = self.getElement(1);
      var a3 = self.getElement(2);

      var b1 = vector.getElement(0).clone();
      var b2 = vector.getElement(1).clone();
      var b3 = vector.getElement(2).clone();

      _elements[0] = field.mul(a2, b3).sub(field.mul(a3, b2));
      _elements[1] = field.mul(a3, b1).sub(field.mul(a1, b3));
      _elements[2] = field.mul(a1, b2).sub(field.mul(a2, b1));

      return self;
    };
  }

  self.ortho = ortho;

  function r4c (matrix) {
    // TODO moltiplicazione righe per colonne
  };

  self.r4c = r4c; // r4c should be an alias, forse meglio rxc?

*/

}

util.inherits(Vector, Tensor)

function clone () {
  return new Vector({
    elements: this.getElements(),
    indices : this.getIndices()
  })
}
Vector.prototype.clone = clone

module.exports = Vector

