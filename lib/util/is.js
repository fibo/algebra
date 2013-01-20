
var is = {};

function isDefined(arg) {
  if (arguments.lenght != 1) throw new Error();

  return typeof arguments[0] === 'undefined';
}

is.defined = isDefined;

module.exports = is;

