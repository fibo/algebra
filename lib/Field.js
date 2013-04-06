
var util = require('util');

var abstractMethod = require('./util/abstractMethod.js');

function Field() {
  var self = this;

//-----------------------------------------------------------------------------

};

// TODO ufficializza (cioè documenta) che le operazioni fatte tramite un Field
// fanno sempre una clone degli elementi, mentre quelle fatte su un elemento ne modificano anche il valore.

// TODO prima dovrei fare element1.belongsToField(this) oppure eccezione

function equals(element1, element2) {
  return this.coerceToElement(element1).clone().equals(element2);
};

Field.prototype.equals = equals;

Field.prototype.eq     = equals;

//-----------------------------------------------------------------------------

function subtraction(element1, element2) {
  return this.coerceToElement(element1).clone().subtraction(element2);
};

Field.prototype.subtraction = subtraction;

Field.prototype.sub         = subtraction;

//-----------------------------------------------------------------------------

function addition(element1, element2) {
  return this.coerceToElement(element1).clone().addition(element2);
};

Field.prototype.addition = addition;

Field.prototype.add      = addition;

//-----------------------------------------------------------------------------

function negation(element) {
  return this.coerceToElement(element).clone().negation();
};

Field.prototype.negation = negation;

Field.prototype.neg      = negation;

//-----------------------------------------------------------------------------

function inversion(element) {
  return this.coerceToElement(element).clone().inversion();
};

Field.prototype.inversion = inversion;

Field.prototype.inv       = inversion;

//-----------------------------------------------------------------------------

function multiplication(element1, element2) {
  return this.coerceToElement(element1).clone().multiplication(element2);
};

Field.prototype.multiplication = multiplication;

Field.prototype.mul            = multiplication;

//-----------------------------------------------------------------------------

function division(element1, element2) {
// TODO if element2.isZero() --> eccezione
  return this.coerceToElement(element1).clone().division(element2);
};

Field.prototype.division = division;

Field.prototype.div      = division;

//-----------------------------------------------------------------------------

module.exports = Field;

