
var util = require('util');

var Element = require('../Element.js');

var InvalidArgumentsException = require('../Exception/InvalidArguments.js');

var is = require('../util/is.js');

function _coerce(x) {
  if (is.number(x)) {
    return x;
  }
  else {
    return x.getData();
  }
};

function RealElement() {
  var self = this;

//-----------------------------------------------------------------------------

  var argumentsAreInvalid = (arguments.length > 1) || (is.notNumber(arguments[0]));

  if (argumentsAreInvalid) {
    new InvalidArgumentsException(arguments);
  }

  Element.call(self, arguments);

//-----------------------------------------------------------------------------

  var _num = arguments[0];

  function getData() {
    return _num;
  };

  self.getData = getData;

  self.num     = getData;

//-----------------------------------------------------------------------------

  function equals(x) {
  var num = _coerce(x);

  return (_num == num);
  };

  self.equals = equals;
  self.eq     = equals;

//-----------------------------------------------------------------------------

  function notEquals(x) {
    var num = _coerce(x);

    return (num != _num);
  };

  self.notEquals = notEquals;
  self.ne        = notEquals;

//-----------------------------------------------------------------------------

  self.neg = function () {
    _num = 0 - _num;

    return self;
  };


//-----------------------------------------------------------------------------

  self.add = function (x) {
    var num = _coerce(x);

    _num += num;

    return self;
  };


//-----------------------------------------------------------------------------

  self.sub = function (x) {
    var num = _coerce(x);

    _num -= num;

    return self;
  };


//-----------------------------------------------------------------------------

  self.inv = function () {
    _num = 1 / _num;

    return self;
  };


//-----------------------------------------------------------------------------

  self.mul = function (x) {
    var num = _coerce(x);

    _num *= num;

    return self;
  };


//-----------------------------------------------------------------------------

  self.div = function (x) {
    var num = _coerce(x);

    _num /= num;

    return self;
  };


//-----------------------------------------------------------------------------

  self.exp = function () {
    _num = Math.exp(_num);

    return self;
  };


//-----------------------------------------------------------------------------

  self.log = function () {
    _num = Math.log(_num);

    return self;
  };

//-----------------------------------------------------------------------------

};

util.inherits(RealElement, Element);

function clone() {
  return new RealElement(this.num());
};

RealElement.prototype.clone = clone;

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

module.exports = RealElement;

