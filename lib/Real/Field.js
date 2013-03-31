
var util = require('util');

var Field       = require('../Field.js');
var RealElement = require('./Element.js');

var coerce = require('../util/coerce.js');
var is     = require('../util/is.js');

function RealField() {
  var self = this;

//-----------------------------------------------------------------------------

  Field.apply(self, arguments);

//-----------------------------------------------------------------------------

};

util.inherits(RealField, Field);

//-----------------------------------------------------------------------------

function coerceToRealElement() {

  var arg = arguments[0];

  if (arg instanceof RealElement) {
    return arg;
  }

  if (is.number(arg)) {
    return new RealElement(arg);
  }

  // TODO raise
};

RealField.prototype.coerceToElement = coerceToRealElement;

//-----------------------------------------------------------------------------

function getZero() { return new RealElement(0); };

RealField.prototype.getZero = getZero;

//-----------------------------------------------------------------------------

function getOne() { return new RealElement(1); };

RealField.prototype.getOne = getOne;

//-----------------------------------------------------------------------------

module.exports = RealField;

