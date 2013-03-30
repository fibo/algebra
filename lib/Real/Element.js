
var util = require('util');

var Element = require('../Element.js');

var is = require('../util/is.js');
var coerce = require('../util/coerce.js');

function RealElement() {
  var self = this;

//-----------------------------------------------------------------------------

  Element.call(self);

//-----------------------------------------------------------------------------

  var arg = arguments[0];

  // Real Element defaults to 0.
  var _num = 0;

  if (is.elementWithNumberDataType(arg)) {
    _num = arg.getData();
  }

  if (is.number(arg)) {
    _num = arg;
  }

  function getData() {
    return _num;
  };

  self.getData = getData;

  self.num     = getData;

//-----------------------------------------------------------------------------

  function negation() {
    _num = 0 - _num;

    return self;
  };

  self.negation = negation;

  self.neg      = negation;

//-----------------------------------------------------------------------------

  function addition() {
    var num = coerce.toNumber(arguments[0]);

    _num += num;

    return self;
  };

  self.addition = addition;

  self.add      = addition;

//-----------------------------------------------------------------------------

  function subtraction() {
    var num = coerce.toNumber(arguments[0]);

    _num -= num;

    return self;
  };

  self.subtraction = subtraction;

  self.sub         = subtraction;

//-----------------------------------------------------------------------------

  function inversion() {
    _num = 1 / _num;

    return self;
  };

  self.inversion = inversion;

  self.inv       = inversion;

//-----------------------------------------------------------------------------

  function multiplication() {
    var num = coerce.toNumber(arguments[0]);

    _num *= num;

    return self;
  };

  self.multiplication = multiplication;

  self.mul            = multiplication;

//-----------------------------------------------------------------------------

  function division() {
    var num = coerce.toNumber(arguments[0]);

    _num /= num;

    return self;
  };

  self.division = division;

  self.div      = division;

//-----------------------------------------------------------------------------

  function exp() {
    _num = Math.exp(_num);

    return self;
  };

  self.exp = exp; // TODO si chiama exponentiation ?

//-----------------------------------------------------------------------------

  function logarithm() {
    _num = Math.log(_num);

    return self;
  };

  self.logarithm = logarithm;

  self.log       = logarithm;

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

util.inherits(RealElement, Element);

//-----------------------------------------------------------------------------

function clone() {
  return new RealElement(this.num());
};

RealElement.prototype.clone = clone;

//-----------------------------------------------------------------------------

function equals(x) {
  var num1 = this.getData();
  var num2 = coerce.toNumber(arguments[0]);

  return (num1 == num2);
};

RealElement.prototype.equals = equals;
RealElement.prototype.eq     = equals;

//-----------------------------------------------------------------------------

function isNotZero() {
  return this.notEquals(0);
};

RealElement.prototype.isNotZero = isNotZero;

//-----------------------------------------------------------------------------

function isOne() {
  return this.equals(1);
};

RealElement.prototype.isOne = isOne;

//-----------------------------------------------------------------------------

function isZero() {
  return this.equals(0);
};

RealElement.prototype.isZero = isZero;

//-----------------------------------------------------------------------------

function notEquals(x) {
  var num1 = this.getData();
  var num2 = coerce.toNumber(arguments[0]);

  return (num1 != num2);
};

RealElement.prototype.notEquals = notEquals;
RealElement.prototype.ne        = notEquals;

//-----------------------------------------------------------------------------

module.exports = RealElement;

