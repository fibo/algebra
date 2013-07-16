var AlgebraTensor, RealTensor, exports,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AlgebraTensor = require('AlgebraTensor');

RealTensor = (function(_super) {
  __extends(RealTensor, _super);

  function RealTensor(indices, elements) {
    RealTensor.__super__.constructor.apply(this, arguments).indices(indices);
  }

  return RealTensor;

})(AlgebraTensor);

exports = RealTensor;
