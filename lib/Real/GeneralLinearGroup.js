
var util = require('util');

var RealSquareMatrix = require('./SquareMatrix.js');

function RealGeneralLinearGroup(order) {
  var self = this;

  var _order = order;

  function Matrix() {
    var arg = {};

    arg.order = _order;

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

