
var util = require('util');

var Group = require('./Group.js');

function Field(arg) {
  var self = this;
}

util.inherits(Field, Group);

Field.prototype.mul = function(element1, element2) {
  return element1.clone().mul(element2);
}

Field.prototype.div = function(element1, element2) {
  return element1.clone().div(element2);
}

Field.prototype.getOne = function() {
// TODO throw Error
}

module.exports = Field;

