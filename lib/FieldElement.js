
var util = require('util');

var GroupElement = require('./GroupElement.js');

function FieldElement(arg) {
  var self = this;

  GroupElement.call(self, arg);
}

FieldElement.prototype = {};

util.inherits(FieldElement, GroupElement);

module.exports = FieldElement;


