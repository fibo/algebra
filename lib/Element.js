
var abstractMethod = require('./util/abstractMethod.js');
var is             = require('./util/is.js');

function Element() {
  var self = this;

//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------

  self.addition = abstractMethod;

  self.getData  = abstractMethod;

  self.negation = abstractMethod;
// TODO ecc

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

Element.prototype.clone = abstractMethod;

Element.prototype.isNotZero = abstractMethod;

Element.prototype.isOne = abstractMethod;

Element.prototype.isZero = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Element;

