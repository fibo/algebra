
function Vector(arg) {
  var self = this;

  var space = arg.space;
  this.getSpace = function() { return space; }
  this.getDim = function() { return space.getDim(); }

  var elements = arg.elements;
  this.getElements = function() { return elements; }
  this.x = function (i) { return elements[i]; }

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

