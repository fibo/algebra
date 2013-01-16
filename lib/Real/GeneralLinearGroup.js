
var RealInvertibleMatrix = require('./InvertibleMatrix.js');

function GeneralLinearGroup(order) {
  var self = this;

  var _order = order;

  self.Matrix = function () {
    var arg = {};

    arg.order = _order;
    arg.elements = [];
    for (var i in arguments) {
      arg.elements.push(arguments[i]);
    }

    RealInvertibleMatrix.call(this, arg);
  };

  // TODO self.Id = self.Matrix;
};

module.exports = GeneralLinearGroup;

