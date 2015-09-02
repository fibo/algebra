
function unaryMutator (operator) {
  return function () {
    this.data = operator(this.data)
    return this
  }
}

exports.unary = unaryMutator

function nAryMutator (operator) {
  return function () {
    this.data = operator.bind(null, this.data).apply(null, arguments)
    return this
  }
}

exports.nAry = nAryMutator

