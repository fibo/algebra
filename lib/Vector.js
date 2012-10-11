
function Vector(arg) {
  var self = this;

  var space = arg.space;
  this.getSpace = function() { return space; }

  var dim = space.getDim();
  this.getDim = function() { return dim; }

  var elements = arg.elements;
  this.getElements = function() { return elements; }
  this.x = function (i) { return elements[i]; }

  if (dim == 3) {
    //Cross product is binary only when dim = 3, so by now I will implement
    //it only in R3.
    self.cross = function(vector) {
      var a1 = self.x(0);
      var a2 = self.x(1);
      var a3 = self.x(2);

      var b1 = vector.x(0);
      var b2 = vector.x(1);
      var b3 = vector.x(2);

      elements[0] = a2 * b3 - a3 * b2;
      elements[1] = a3 * b1 - a1 * b3;
      elements[2] = a1 * b2 - a2 * b1;
    }
  }

  self.r4c = function(matrix) {
    // TODO moltiplicazione righe per colonne
  }

  self.scalar = function(scalar) {
    for(var i in elements) {
      elements[i] *= scalar;
    }
    return self;
  }

  self.add = function(vector) {
    for(var i in self.getElements()) {
      elements[i] += vector.x(i);
    }
    return self;
  }

  self.sub = function(vector) {
    for(var i in self.getElements()) {
      elements[i] -= vector.x(i);
    }
    return self;
  }

  self.dot = function(vector) {
    for(var i in self.getElements()) {
      elements[i] += vector.x(i);
    }
    return self;
  }

  self.cross = function(vector) {
    for(var i in self.getElements()) {
      //elements[i] += vector.x(i);
    }
    return self;
  }
}

Vector.prototype = {};

module.exports = Vector;

