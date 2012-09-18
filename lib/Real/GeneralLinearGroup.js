
var RealField = require('../Real/Field.js');
var R = new RealField();

var GeneralLinearGroup = require('../GeneralLinearGroup.js');

var RealGeneralLinearGroup = function(order) {
  var arg = {};

  arg.order = order;
  arg.dim = order * order;
  arg.field = R;

console.log(arg);

  GeneralLinearGroup.call(this, arg);
}

RealGeneralLinearGroup.prototype = GeneralLinearGroup.prototype;

module.exports = GeneralLinearGroup;

