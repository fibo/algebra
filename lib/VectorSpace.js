
var Vector = require('./Vector.js');

function VectorSpace(arg) {
  var field = arg.field;
  this.getField = function() { return field; }

  var dim = arg.dim;
  this.getDim = function() { return dim; }

  // TODO read arg.basis or let transform the basis,
  //      i.e. multiply by a matrix.
  var basis = [];
  var zero = field.getZero();
  var one = field.getOne();
  for (var i = 0; i < dim; i++) {
    var arg = {};
    var elements = [];

    for (var j = 0; j < dim; j++) {
      if (i == j) {
        elements.push(one);
      }
      else {
        elements.push(zero);
      }
    }
    arg.elements = elements;
    arg.space = this;
    Ei = new Vector(arg);
    basis.push(Ei);
  }
  this.getBasis = function() { return basis; }
  
  var self = this;

  this.Vector = function() {
    arg.elements = arguments;
    arg.space = self;
    
    Vector.call(this, arg);
  }

  this.getZero = function() {
    arg = {};

    var elements = [];
    for (var i = 0; i < dim; i++) {
      elements.push(field.getZero());
    }
    arg.elements = elements;
    arg.space = this;
    var zero = new Vector(arg);
  }
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

