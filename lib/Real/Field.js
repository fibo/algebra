
// TODO per il campo dei reali posso anche evitare di avere una classe.
var RealField = function() {
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

