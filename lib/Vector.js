
var Tensor = require('./Tensor.js')
  , util  = require('util')

function Vector () {
  var self = this
    , arg = arguments[0] || {}
    , _dimension = 0
    , _space     = null


  Tensor.call(self, arg)

  // TODO provvisorio
  _space = arg.space

  function getSpace () {
    return _space
  }
  self.getSpace = getSpace

/*
  function setDimension () {
    var arg = arguments[0]

    if (is.number(arg))
      _dimension = arg    
  }
*/
  if (_space)
    _dimension = _space.getDim()

//-----------------------------------------------------------------------------

  var _elements = arg.elements;

  function getElement (i) {
    return _elements[i];
  };

  self.getElement = getElement;

//-----------------------------------------------------------------------------

  function getElements () {
    return _elements;
  };

  self.getElements = getElements;

//-----------------------------------------------------------------------------

  function equals (vector) {
    result = true;

    for (var i in self.getElements()) {
      if (!_elements[i].eq(vector.getElement(i))) {
        result = false;
        continue;
      }
    }
    return result;
  };

  self.equals = equals;

  self.eq     = equals;

//-----------------------------------------------------------------------------

  function addition (vector) {
    for (var i in self.getElements()) {
      _elements[i].add(vector.getElement(i));
    }
    return self;
  };

  self.addition = addition;

  self.add      = addition;

//-----------------------------------------------------------------------------

  function subtraction (vector) {
    for (var i in self.getElements()) {
      _elements[i].sub(vector.getElement(i));
    }

    return self;
  };

  self.subtraction = subtraction;

  self.sub         = subtraction;

//-----------------------------------------------------------------------------

  function scalarMultiplication(element) {
    for (var i in _elements) {
      _elements[i].mul(element);
    }
    return self;
  };

  self.scalarMultiplication = scalarMultiplication;

  self.scalar               = scalarMultiplication;

//-----------------------------------------------------------------------------

  function dotProduct (vector) {
    var scalar = _elements[0].clone();

    for (var i in self.getElements()) {
      scalar.add(scalar.mul(vector.getElement(i)));
    }

    return scalar;
  };

  self.dotProduct = dotProduct;

  self.dot        = dotProduct;

//-----------------------------------------------------------------------------

  function ortho (vector) {
    return self.dot(vector).isZero();
  };

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

//-----------------------------------------------------------------------------

  function r4c (matrix) {
    // TODO moltiplicazione righe per colonne
  };

  self.r4c = r4c; // r4c should be an alias, forse meglio rxc?

//-----------------------------------------------------------------------------

}

util.inherits(Vector, Tensor)

function clone() {
  return new Vector({
    elements: this.getElements(),
    space   : this.getSpace()
  })
}
Vector.prototype.clone = clone

module.exports = Vector

