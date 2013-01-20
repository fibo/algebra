
var RealSquareMatrix = require('./SquareMatrix.js');

function RealGeneralLinearGroup(order) {
  var self = this;

  var _order = order;

  self.Matrix = function Matrix() {
    var arg = {};

    arg.order = _order;
    arg.elements = [];
    for (var i in arguments) {
      arg.elements.push(arguments[i]);
    }

    RealSquareMatrix.call(this, arg);

    if (this.determinant().isZero()) throw new Error();
  };

  self.Id = self.Identity = function Identity() {return new Matrix()};
};

module.exports = RealGeneralLinearGroup;

