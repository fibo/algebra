
function Vector(arg) {
  var self = this;

  var _space = arg.space;
  self.getSpace = function () { return _space; }

  self.getDim = _space.getDim;

  var _elements = arg.elements;
  self.getElement = function (i) { return _elements[i]; }
  self.getElements = function () { return _elements; }


  self.r4c = function (matrix) {
    // TODO moltiplicazione righe per colonne
  }

  self.scalar = function (scalar) {
    for(var i in _elements) {
      _elements[i].mul(scalar);
    }
    return self;
  }

  self.add = function(vector) {
    for(var i in self.getElements()) {
      _elements[i].add(vector.getElement(i));
    }
    return self;
  }

  self.sub = function(vector) {
    for(var i in self.getElements()) {
      _elements[i] -= vector.x(i);
    }
    return self;
  }

  self.dot = function(vector) {
    var scalar = new _Element();
    for(var i in self.getElements()) {
      //scalar += _elements[i] * vector.x(i);
    }
    return scalar;
  }
}

Vector.prototype = {
  clone: function() {
    var arg = {};

    arg.elements = this.getElements();
    arg.space = this.getSpace();

    return new Vector(arg);
  }
};

module.exports = Vector;

