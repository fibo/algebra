
var util = require('util');

var Field   = require('../Field.js');
var Complex = require('./Element.js');

var ComplexField = function () {
  var self = this;
};

util.inherits(ComplexField, Field);

ComplexField.prototype.getZero = function () {
    return new Complex(0);
};

ComplexField.prototype.getOne = function () {
    return new Complex(1);
};

ComplexField.prototype.getMinusOne = function () {
    return new Complex(-1);
};

ComplexField.prototype.getI = function () {
    return new Complex(0, 1);
};

ComplexField.prototype.getMinusI = function () {
    return new Complex(0, -1);
};

module.exports = ComplexField;

