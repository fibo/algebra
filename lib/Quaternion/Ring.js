
var QuaternionElement = require('./Element.js');

var QuaternionField = function () {
  this;
};

QuaternionField.prototype = {
  getZero: function () {
    return new QuaternionElement(0);
  },

  getOne: function () {
    return new QuaternionElement(1);
  },

  getMinusOne: function () {
    return new QuaternionElement(-1);
  },

  getI: function () {
    return new QuaternionElement(0, 1, 0, 0);
  },

  getMinusI: function () {
    return new QuaternionElement(0, -1, 0, 0);
  },

  getJ: function () {
    return new QuaternionElement(0, 0, 1, 0);
  },

  getMinusJ: function () {
    return new QuaternionElement(0, 0, -1, 0);
  },

  getK: function () {
    return new QuaternionElement(0, 0, 0, 1);
  },

  getMinusK: function () {
    return new QuaternionElement(0, 0, 0, -1);
  }
};

module.exports = QuaternionField;

