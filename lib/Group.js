
var abstractMethod = require('./util/abstractMethod.js');

function Group(arg) {
  var self = this;

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

Group.prototype.coerceToElement = abstractMethod;

//-----------------------------------------------------------------------------

function negation(element) {
  try {
    var element = this.coerceToElement(element);
    return element.clone().neg();
  }
  catch (err) {}
};

Group.prototype.negation = negation;

Group.prototype.neg      = negation;

//-----------------------------------------------------------------------------

function equals(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.eq(element2);
  }
  catch (err) {}
};

Group.prototype.equals = equals;

Group.prototype.eq     = equals;

//-----------------------------------------------------------------------------

function addition(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().add(element2);
  }
  catch (err) {}
};

Group.prototype.addition = addition;

Group.prototype.add      = addition;

//-----------------------------------------------------------------------------

function subtraction(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().sub(element2);
  }
  catch (err) {}
};

Group.prototype.subtraction = subtraction;

Group.prototype.sub         = subtraction;

//-----------------------------------------------------------------------------

Group.prototype.getZero = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Group;

