
var RealInvertibleMatrix = require('./InvertibleMatrix.js');

function GeneralLinearGroup(order) {
  var self = this;

  var _order = order;

  self.Matrix = function () {
    var arg = {};

    arg.order = _order;

    RealInvertibleMatrix.call(this, arg);
  };

  // TODO self.Id = self.Matrix;
};

module.exports = GeneralLinearGroup;

