
var is = {};

//-----------------------------------------------------------------------------

function isArray() {
  return Array.isArray(arguments[0]);
}

is.array = isArray;

//-----------------------------------------------------------------------------

function isElementWithNumberDataType() {
  if (typeof arguments[0].getData === 'function') {
    return typeof arguments[0].getData() === 'number';
  }

  return false;
}

is.elementWithNumberDataType = isElementWithNumberDataType;

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

function isUndefined() {
  return typeof arguments[0] === 'undefined';
}

is.undef = isUndefined;

//-----------------------------------------------------------------------------

module.exports = is;

