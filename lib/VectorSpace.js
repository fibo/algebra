
var Vector = require('./Vector.js');

function VectorSpace(arg) {
  var self = this;

  var _field = arg.field;
  this.getField = function () { return _field; };
  var zero = _field.getZero();
  var one = _field.getOne();

  var _dim = arg.dim;
  this.getDim = function () { return _dim; };

  // TODO read arg.basis or let transform the basis,
  //      i.e. multiply by a matrix.
  var basis = [];
  this.getBasis = function () { return basis; };
  
  self.getE = function (i) {
    var arg = {};
    var elements = [];

    for (var j = 0; j < _dim; j++) {
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
  };

  self.getZero = function () {
    arg = {};

    var elements = [];
    for (var i = 0; i < _dim; i++) {
      elements.push(_field.getZero());
    }

    arg.elements = elements;
    arg.space = self;

    return new Vector(arg);
  };
};

module.exports = VectorSpace;

