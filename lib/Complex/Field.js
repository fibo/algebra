
var ComplexElement = require('./Element.js');

var ComplexField = function() {
  this;
}

ComplexField.prototype = {
  getZero: function() {
    return new ComplexElement(0);
  },
  getOne: function() {
    return new ComplexElement(1);
  },
  getMinusOne: function() {
    return new ComplexElement(-1);
  },
  getI: function() {
    return new ComplexElement(0, 1);
  },
  getMinusI: function() {
    return new ComplexElement(0, -1);
  },
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

module.exports = ComplexField;

