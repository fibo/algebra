
var util = require('util');

var Group = require('./Group.js');

function Field(arg) {
  var self = this;
};

util.inherits(Field, Group);

Field.prototype.inv = function(element) {
  try {
    var element = this.coerceToElement(element);
    return element.clone().inv();
  }
  catch (err) {}
};

Field.prototype.mul = function(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().mul(element2);
  }
  catch (err) {}
};

Field.prototype.div = function(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().div(element2);
  }
  catch (err) {}
};

Field.prototype.getOne = function() {
// TODO throw Error (unimplemented abstract function
};

module.exports = Field;

