
var QuaternionElement = require('./Element.js');

var QuaternionField = function() {
  this;
}

QuaternionField.prototype = {
  getZero: function() { return new QuaternionElement(0); },
  getOne: function() { return new QuaternionElement(1); },
  add: function(a, b) {
    return a.clone().add(b); 
  },
  mul: function(a, b) {
    return a.clone().mul(b); 
  },
  sub: function(a, b) {
    return a.clone().sub(b); 
  },
  div: function(a, b) {
    // TODO b != 0, vedi anche il number Infinity
    return a.clone().div(b); 
  },
  inv: function(a) {
    return a.clone().inv(); 
  },
  neg: function(a) {
    return a.clone().inv(); 
  }
};

module.exports = QuaternionField;


