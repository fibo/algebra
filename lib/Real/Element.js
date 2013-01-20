
function RealElement(arg) {
  var self = this;

  var _num = 0;
  if (typeof arg == 'number') {
    _num = arg;
  }

  self.num = function () { return _num; };

  function coerce(x) {
    if (typeof x == 'number') {
      return x;
    }
    else {
      return x.num();
    }
  };

  function equals(x) {
    var num = coerce(x);

    return (num == _num);
  };

  self.eq = self.equals = equals;

  function notEquals(x) {
    var num = coerce(x);

    return (num != _num);
  };

  self.ne = self.notEquals = notEquals;

  function isZero() {
    return equals(0);
  };

  self.isZero = isZero;

  function isOne() {
    return equals(1);
  };

  self.isOne = isOne;

  function isNotZero() {
    return notEquals(0);
  };

  self.isNotZero = isNotZero;

  self.neg = function () {
    _num = 0 - _num;

    return self;
  };

  self.add = function (x) {
    var num = coerce(x);

    _num += num;

    return self;
  };

  self.sub = function (x) {
    var num = coerce(x);

    _num -= num;

    return self;
  };

  self.inv = function () {
    _num = 1 / _num;

    return self;
  };

  self.mul = function (x) {
    var num = coerce(x);

    _num *= num;

    return self;
  };

  self.div = function (x) {
    var num = coerce(x);

    _num /= num;

    return self;
  };

  self.exp = function () {
    _num = Math.exp(_num);

    return self;
  };

  self.log = function () {
    _num = Math.log(_num);

    return self;
  };
};

RealElement.prototype.clone = function () {
  return new RealElement(this.num());
};

module.exports = RealElement;

