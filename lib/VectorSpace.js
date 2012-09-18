
var Vector = require('./Vector.js');

var VectorSpace = function(arg) {
  var field = arg.field;
  this.getField = function() { return field; }

  var dim = arg.dim;
  this.getDim = function() { return dim; }

  var basis = arg.basis; // TODO || Matrice identita. La base e' una matrice.
  this.getBasis = function() { return basis; }
  
}

VectorSpace.prototype = {
  getZero: function() {
    var field = this.getField();
    var dim = this.getDim();
    var elements = [];

    for (var i = 0; i < dim; i++) {
      elements.push(field.getZero());
    }

    var zero = new Vector({
      space: this,
      elements: elements
    });

    return zero;
  },
  Vector: function() {
    var arg = {};
    arg.space = this;
    arg.elements = arguments;

    var vector = new Vector(arg);

    return vector;
  }
};

module.exports = VectorSpace;

