
var is = require('./is.js');

var coerce = {};

//-----------------------------------------------------------------------------

function coerceToNumber() {
  var arg = arguments[0];

  if (is.number(arg)) { return arg; }  

  if (is.elementWithNumberDataType(arg)) { return arg.getData(); }  

  // TODO raise exception;
  
};

coerce.toNumber = coerceToNumber;

//-----------------------------------------------------------------------------


module.exports = coerce;

