
// TODO vedi se poi serve RealElement
var RealField = function() {}

RealField.prototype = {
  addition: function(a, b) {
    return a + b;
  },
  multiplication: function(a, b) {
    return a * b;
  },
  subtraction: function(a, b) {
    return a - b;
  },
  division: function(a, b) {
    // TODO b isNotZero
    return a / b;
  },
  getZero: function() { return 0; },
  getOne: function() { return 1; }
};

module.exports = RealField;

