
var Vector = require('./Vector.js');

function VectorSpace(arg) {
  var self = this;

  var field = arg.field;
  this.getField = function() { return field; }
  var zero = field.getZero();
  var one = field.getOne();

  var dim = arg.dim;
  this.getDim = function() { return dim; }

  // TODO read arg.basis or let transform the basis,
  //      i.e. multiply by a matrix.
  var basis = [];
  this.getBasis = function() { return basis; }
  
  self.Vector = function() {
    arg.elements = arguments;
    arg.space = self;
    
    Vector.call(this, arg);
  }

  self.getE = function(i) {
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
    arg.space = self;

    return new Vector(arg);
  }

  self.getZero = function() {
    arg = {};

    var elements = [];
    for (var i = 0; i < dim; i++) {
      elements.push(field.getZero());
    }

    arg.elements = elements;
    arg.space = self;

    return new Vector(arg);
  }

  self.Vector = function() {
    var arg = {};

    arg.space = self;
    arg.elements = [];

    for (var i in arguments) {
      arg.elements.push(arguments[i]);
    }

    Vector.call(this, arg);
  }
}

VectorSpace.prototype = {};

module.exports = VectorSpace;

