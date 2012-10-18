
var RealElement = function(arg) {
  var self = this;

  var num = 0;
  if (typeof arg == 'number') {
    num = arg;
  }
  self.num = function () { return num; }

  self.eq = function (x) {
    var num2;

    if (typeof x == 'number') {
      var num2 = x;
    }
    else {
      num2 = x.num();
    }

    if (num == num2) {
      return true;
    }
    else {
      return false;
    }
  }

  self.add = function (x) {
    var num2;

    if (typeof x == 'number') {
      var num2 = x;
    }
    else {
      num2 = x.num();
    }

    num += num2;

    return self;
  }

  self.sub = function (x) {
    var num2;

    if (typeof x == 'number') {
      var num2 = x;
    }
    else {
      num2 = x.num();
    }

    num -= num2;

    return self;
  }

  self.mul = function (x) {
    var num2;

    if (typeof x == 'number') {
      var num2 = x;
    }
    else {
      num2 = x.num();
    }

    num *= num2;

    return self;
  }

  self.div = function (x) {
    var num2;

    if (typeof x == 'number') {
      var num2 = x;
    }
    else {
      num2 = x.num();
    }

    num /= num2;

    return self;
  }
}

RealElement.prototype = {
  clone: function () {
    return new RealElement(this.num());
  }
};

module.exports = RealElement;

