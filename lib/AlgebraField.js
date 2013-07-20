
function AlgebraField() {
  this.one = null
  this.zero = null
}

function abstractMethod() {
  throw new Error('unimplemented abstract method')
}

AlgebraField.prototype = {
  addition: abstractMethod,
  add: abstractMethod
}

module.exports = AlgebraField

