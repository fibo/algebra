
var util = require('util');

var Element = require('./Element.js');

var UnimplementedAbstractMethodException = require('./Exception/UnimplementedAbstractMethod.js');

function RingElement() {
  var self = this;

  Element.call(self, arguments);
};

util.inherits(RingElement, Element);

function abstractMethod() {
  new UnimplementedAbstractMethodException();
};

RingElement.prototype.negation = abstractMethod;

RingElement.prototype.addition = abstractMethod;

RingElement.prototype.subtraction = abstractMethod;

RingElement.prototype.inversion = abstractMethod;

RingElement.prototype.leftMultiplication = abstractMethod;

RingElement.prototype.rightMultiplication = abstractMethod;

RingElement.prototype.leftDivision = abstractMethod;

RingElement.prototype.rightDivision = abstractMethod;

module.exports = RingElement;

