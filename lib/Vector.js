
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
}

module.exports = Vector;

