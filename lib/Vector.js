
var Vector = function (arg) {
  var space = arg.space;
  this.getSpace = function() { return space; }

  var elements = arg.elements;
  this.getElements = function() { return elements; }
  this.x = function (i) { return elements[i]; }
}

Vector.prototype = {
  getDim: function() {
    return this.getSpace().getDim();
  }
};

module.exports = Vector;

