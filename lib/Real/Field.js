
var util = require('util');

var Field = require('../Field.js');
var Real = require('./Element.js');

var RealField = function() {
  var self = this;
}

util.inherits(RealField, Field);

RealField.prototype.getZero = function () { return new Real(0); };

RealField.prototype.getOne = function () { return new Real(1); };

module.exports = RealField;

