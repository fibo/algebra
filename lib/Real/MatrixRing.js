
var util = require('util');

var MatrixRing = require('../MatrixRing.js');
var RealField = require('./Field.js');

var R = new RealField();

var RealMatrixRing = function(order) {
  var self = this;

  var arg = {};
  arg.order = order;
  arg.field = R;

  MatrixRing.call(self, arg);

};

util.inherits(RealMatrixRing, MatrixRing);

module.exports = RealMatrixRing;

