
var util = require('util');

var Field = require('../Field.js');
var RealElement = require('./Element.js');
var coerce = require('../util/coerce.js');

function RealField() {
  var self = this;
};

util.inherits(RealField, Field);

RealField.prototype.coerceToElement = coerce.toRealElement;

RealField.prototype.getZero = function getZero() { return new RealElement(0); };

RealField.prototype.getOne = function getOne() { return new RealElement(1); };

module.exports = RealField;

