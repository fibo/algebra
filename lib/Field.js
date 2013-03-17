
var util = require('util');

var Ring = require('./Ring.js');

var abstractMethod = require('./util/abstractMethod.js');

function Field() {
  var self = this;

//-----------------------------------------------------------------------------

  Ring.call(self, arguments);

};

//-----------------------------------------------------------------------------

util.inherits(Field, Ring);

//-----------------------------------------------------------------------------

function abstractMethod() {
  new UnimplementedAbstractMethodException();
};

//-----------------------------------------------------------------------------

function inversion(element) {
  try {
    var element = this.coerceToElement(element);
    return element.clone().inv();
  }
  catch (err) {}
};

Field.prototype.inversion = inversion;

Field.prototype.inv       = inversion;

//-----------------------------------------------------------------------------

function multiplication(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().mul(element2);
  }
  catch (err) {}
};

Field.prototype.multiplication = multiplication;

Field.prototype.mul            = multiplication;

//-----------------------------------------------------------------------------

function division(element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().div(element2);
  }
  catch (err) {}
};

Field.prototype.division = division;

Field.prototype.div      = division;

//-----------------------------------------------------------------------------

module.exports = Field;

