
var QuaternionElement = require('./Element.js');

var QuaternionField = function() {
  this;
}

QuaternionField.prototype = {
  getZero: function() {
    return new QuaternionElement(0);
  },
  getOne: function() {
    return new QuaternionElement(1);
  },
  getMinusOne: function() {
    return new QuaternionElement(1);
  },
  getI: function() {
    return new QuaternionElement(1);
  },
  getMinusI: function() {
    return new QuaternionElement(1);
  },
  getJ: function() {
    return new QuaternionElement(1);
  },
  getMinusJ: function() {
    return new QuaternionElement(1);
  },
  getK: function() {
    return new QuaternionElement(1);
  },
  getMinusK: function() {
    return new QuaternionElement(1);
  }
};

module.exports = QuaternionField;


