function unaryMethod (operator, Scalar) {
  return function () {
    var data = operator(this.data)
    return new Scalar(data)
  }
}

exports.unary = unaryMethod

function nAryMethod (operator, Scalar) {
  return function () {
    var data = operator.bind(null, this.data).apply(null, arguments)
    return new Scalar(data)
  }
}

exports.nAry = nAryMethod
