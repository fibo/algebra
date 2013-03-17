
var is = {};

//-----------------------------------------------------------------------------

function isUndefined() {
  return typeof arguments[0] === 'undefined';
}

is.undef = isUndefined;

//-----------------------------------------------------------------------------

function isNumber() {
  return typeof arguments[0] === 'number';
}

is.number = isNumber;

//-----------------------------------------------------------------------------
module.exports = is;

