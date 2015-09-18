
// TODO Rename it, there will be no mutator, but only immutable objects.

function unaryMutator (operator) {
  return function () {
    this.data = operator(this.data)
    return this
  }
}

exports.unary = unaryMutator

function nAryMutator (operator, Scalar) {
  return function () {
    var data = operator.bind(null, this.data).apply(null, arguments)
    return new Scalar(data)
  }
}

exports.nAry = nAryMutator

