
var util = require('util');

var Element = require('./Element.js');

function RingElement() {
  var self = this;

  Element.call(self, arguments);
};

util.inherits(RingElement, Element);

module.exports = RingElement;

