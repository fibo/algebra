
var RealField = require('./Field.js');
var R = new RealField();

var GeneralLinearGroup = require('../GeneralLinearGroup.js');

var RealGeneralLinearGroup = function(order) {
  var arg = {};

  arg.order = order;
  arg.dim = order * order;
  arg.field = R;

  GeneralLinearGroup.call(this, arg);
}

RealGeneralLinearGroup.prototype = GeneralLinearGroup.prototype;

module.exports = RealGeneralLinearGroup;

