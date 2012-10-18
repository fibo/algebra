
var RealElement = function(arg) {
  var self = this;

  var num = 0;
  if (typeof arg == 'number') {
    num = arg;
  }
  self.num = function () { return num; }

  self.eq = function (x) {
    if ( x.num() == num ) {
      return true;
    }
    else {
      return false;
    }
  }

  self.add = function () {}

  self.sub = function () {}

  self.mul = function () {}

  self.div = function () {}
}

RealElement.prototype = {
  clone: function () {
    return new RealElement(this.num());
  }
};

module.exports = RealElement;

