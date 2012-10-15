
var util = require('util');

var FieldElement = require('./FieldElement.js');

function RingElement(arg) {
  var self = this;

  FieldElement.call(self, arg);
}

RingElement.prototype = {};

util.inherits(RingElement, FieldElement);

module.exports = FieldElement;

