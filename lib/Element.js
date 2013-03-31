
var abstractMethod = require('./util/abstractMethod.js');
var is             = require('./util/is.js');

function Element() {
  var self = this;

//-----------------------------------------------------------------------------

  self.addition            = abstractMethod;
  self.add                 = abstractMethod;
  self.getData             = abstractMethod;
  self.inversion           = abstractMethod;
  self.inv                 = abstractMethod;
  self.leftMultiplication  = abstractMethod;
  self.lmul                = abstractMethod;
  self.multiplication      = abstractMethod;
  self.mul                 = abstractMethod;
  self.rightMultiplication = abstractMethod;
  self.rmul                = abstractMethod;
  self.negation            = abstractMethod;
  self.neg                 = abstractMethod;
  self.subtraction         = abstractMethod;
  self.sub                 = abstractMethod;

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

Element.prototype.clone     = abstractMethod;
Element.prototype.equals    = abstractMethod;
Element.prototype.isNotOne  = abstractMethod;
Element.prototype.isNotZero = abstractMethod;
Element.prototype.isOne     = abstractMethod;
Element.prototype.isZero    = abstractMethod;
Element.prototype.notEquals = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Element;

