
var util = require('util');

var Field = require('../Field.js');
var RealElement = require('./Element.js');
var coerce = require('../util/coerce.js');

function RealField() {
  var self = this;
};

util.inherits(RealField, Field);


//-----------------------------------------------------------------------------

RealField.prototype.coerceToElement = coerce.toRealElement;


//-----------------------------------------------------------------------------

function getZero() { return new RealElement(0); };

RealField.prototype.getZero = getZero;


//-----------------------------------------------------------------------------

function getOne() { return new RealElement(1); };

RealField.prototype.getOne = getOne;


//-----------------------------------------------------------------------------

module.exports = RealField;

