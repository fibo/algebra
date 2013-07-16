var AlgebraElement, RealElement, exports,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AlgebraElement = require('AlgebraElement');

RealElement = (function(_super) {
  __extends(RealElement, _super);

  function RealElement(num) {
    if (num == null) {
      num = 0;
    }
    RealElement.__super__.constructor.apply(this, arguments).data(num);
  }

  RealElement.add = function() {};

  RealElement.addition = RealElement.add;

  return RealElement;

})(AlgebraElement);

exports = RealElement;
