
function abstractOperator() {
  throw new Error('unimplemented abstract operator')
}

function overrideConstantError() {
  throw new Error('Cannot override a constant')
}

function AlgebraField() {
  var arg = arguments[0]
  var self = this

  function addConstant(name, data) {
    self.__defineGetter__(name, function () {
      return data
    })
    self.__defineSetter__(name, overrideConstantError)
  }
  
  addConstant('zero', arg.zero)
  addConstant('one', arg.one)

  for (var c in arg.constants)
    addConstant(c, arg.constants[c])
}


AlgebraField.prototype = {
  addition    : abstractOperator,
  add         : abstractOperator,
  subtraction : abstractOperator,
  sub         : abstractOperator,
  equal       : abstractOperator,
  eq          : abstractOperator,
  notEqual    : abstractOperator,
  ne          : abstractOperator
}

module.exports = AlgebraField

