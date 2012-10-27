
var ComplexElement = require('./Element.js');

var ComplexField = function() {
  var self = this;

}

ComplexField.prototype = {
  getZero: function() {
    return new ComplexElement(1);
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
  }
};

module.exports = ComplexField;

