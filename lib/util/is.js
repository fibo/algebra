
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

function isNotNumber() {
  return typeof arguments[0] !== 'number';
}

is.notNumber = isNotNumber;

//-----------------------------------------------------------------------------

module.exports = is;

