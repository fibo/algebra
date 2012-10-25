
var RealElement = function(arg) {
  var self = this;

  var _num = 0;
  if (typeof arg == 'number') {
    _num = arg;
  }
  self.num = function () { return _num; }

  var coerce = function (x) {
    if (typeof x == 'number') {
      return x;
    }
    else {
      return x.num();
    }
  }

  self.eq = function (x) {
    var num = coerce(x);

    return (num == _num);
  }

  self.neg = function () {
    _num = 0 - _num;

    return self;
  }

  self.add = function (x) {
    var num = coerce(x);

    _num += num;

    return self;
  }

  self.sub = function (x) {
    var num = coerce(x);

    _num -= num;

    return self;
  }

  self.inv = function () {
    _num = 1 / _num;

    return self;
  }

  self.mul = function (x) {
    var num = coerce(x);

    _num *= num;

    return self;
  }

  self.div = function (x) {
    var num = coerce(x);

    _num /= num;

    return self;
  }
}

RealElement.prototype.clone = function () {
  return new RealElement(this.num());
}

module.exports = RealElement;

