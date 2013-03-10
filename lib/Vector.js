
function Vector(arg) {
  var self = this;

//-----------------------------------------------------------------------------

  var _space = arg.space;
  self.getSpace = function () { return _space; };

//-----------------------------------------------------------------------------

  self.getDim = _space.getDim;

//-----------------------------------------------------------------------------

  var _elements = arg.elements;
  self.getElement = function (i) { return _elements[i]; };

//-----------------------------------------------------------------------------

  self.getElements = function () { return _elements; };

//-----------------------------------------------------------------------------

  function eq(vector) {
    result = true;

    for (var i in self.getElements()) {
      if (!_elements[i].eq(vector.getElement(i))) {
        result = false;
        continue;
      }
    }
    return result;
  };

  self.eq = eq; // TODO equals

//-----------------------------------------------------------------------------

  function add(vector) {
    for (var i in self.getElements()) {
      _elements[i].add(vector.getElement(i));
    }
    return self;
  };

  self.add = add;

//-----------------------------------------------------------------------------

  function sub(vector) {
    for (var i in self.getElements()) {
      _elements[i].sub(vector.getElement(i));
    }

    return self;
  };

  self.sub = sub;

//-----------------------------------------------------------------------------

  function scalar(element) {
    for (var i in _elements) {
      _elements[i].mul(element);
    }
    return self;
  };

  self.scalar = scalar; // TODO scalar shoulf be an alias of scalarMultiplication

//-----------------------------------------------------------------------------

  function dot(vector) {
    var scalar = _elements[0].clone();

    for (var i in self.getElements()) {
      scalar.add(scalar.mul(vector.getElement(i)));
    }

    return scalar;
  };

  self.dot = dot;

//-----------------------------------------------------------------------------

  function ortho(vector) {
    return self.dot(vector).isZero();
  };

  if (self.getDim() == 3) {
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

  function r4c(matrix) {
    // TODO moltiplicazione righe per colonne
  };

  self.r4c = r4c; // r4c should be an alias, forse meglio rxc?

//-----------------------------------------------------------------------------

}

//-----------------------------------------------------------------------------

// TODO come tutti i clone sarebbe da uniformare
Vector.prototype.clone = function clone() {
    var arg = {};

    arg.elements = this.getElements();
    arg.space = this.getSpace();

    return new Vector(arg);
};

//-----------------------------------------------------------------------------

// TOOD vedi se e' da togliere, vedi anche i toString
// o come fare in generale
Vector.prototype.inspect = function () {
    return this.getElements();
};

module.exports = Vector;

