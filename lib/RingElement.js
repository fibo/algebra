
var util = require('util');

var Element = require('./Element.js');

var abstractMethod = require('./util/abstractMethod.js');

// TODO eredita da groupelement, fai anche field element

function RingElement() {
  var self = this;

//-----------------------------------------------------------------------------

  Element.call(self, arguments);
};

util.inherits(RingElement, Element);

//-----------------------------------------------------------------------------

RingElement.prototype.negation = abstractMethod;

RingElement.prototype.neg = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.addition = abstractMethod;

RingElement.prototype.add = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.subtraction = abstractMethod;

RingElement.prototype.sub = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.inversion = abstractMethod;

RingElement.prototype.inv = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.leftMultiplication = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.rightMultiplication = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.leftDivision = abstractMethod;

//-----------------------------------------------------------------------------

RingElement.prototype.rightDivision = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = RingElement;

