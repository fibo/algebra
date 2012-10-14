
var RealField = function() {
  this;
}

RealField.prototype = {
  add: function(a, b) {
    return a + b;
  },
  mul: function(a, b) {
    return a * b;
  },
  sub: function(a, b) {
    return a - b;
  },
  div: function(a, b) {
    // TODO b isNotZero
    return a / b;
  },
  getZero: function() { return 0; },
  getOne: function() { return 1; }
};

module.exports = RealField;

