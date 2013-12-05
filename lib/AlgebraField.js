
function abstractOperator() {
  throw new Error('unimplemented abstract operator')
}

function AlgebraField(zero, one) {

  // zero
  function getZero() { return zero }

  Object.defineProperty(this, 'zero', {get: getZero})

  // one
  function getOne() { return one }

  Object.defineProperty(this, 'one', {get: getOne})
}

AlgebraField.prototype = {
  addition       : abstractOperator,
  add            : abstractOperator,
  subtraction    : abstractOperator,
  sub            : abstractOperator,
  multiplication : abstractOperator,
  mul            : abstractOperator,
  division       : abstractOperator,
  div            : abstractOperator,
  equal          : abstractOperator,
  eq             : abstractOperator,
  notEqual       : abstractOperator,
  ne             : abstractOperator,
  inversion      : abstractOperator,
  inv            : abstractOperator,
  negation       : abstractOperator,
  neg            : abstractOperator
}

module.exports = AlgebraField

