
var util = require('util');

var RealSquareMatrix = require('./SquareMatrix.js');

function RealGeneralLinearGroup(order) {
  var self = this;

  var _order = order;

  function Matrix() {
    var arg = {};

    arg.order = _order;

  // Defaults to Identity.
  if (! _.isArray(arg.elements)) {
    for (var i = 0; i < _order; i++) {
      for (var j = 0; j < _order; j++) {
        i == j ? _elements.push(R.getOne()) : _elements.push(R.getZero());
      }
    }
  }

  for (var i in arg.elements) {
    var element = new RealElement(arg.elements[i]);
    _elements.push(element);
  }

    arg.elements = [];
    for (var i in arguments) {
      arg.elements.push(arguments[i]);
    }

    RealSquareMatrix.call(this, arg);

    if (this.determinant().isZero()) throw new Error();
  };

  util.inherits(Matrix, RealSquareMatrix);

  self.Matrix = Matrix;

  function Identity() { return new Matrix() };

  self.Id = self.Identity = Identity;
};

module.exports = RealGeneralLinearGroup;

