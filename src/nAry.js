var coerced = require('./coerced')

function nAry (indices, operator) {
  var isScalar = ((indices.length === 1) && (indices[0] === 1))

  return function () {
    var op = coerced(operator)

    if (isScalar) {
      return op.apply(null, arguments)
    } else {
      var first = arguments[0]
      var rest = [].slice.call(arguments, 1)
      var dimension = indices.reduce((a, b) => {
        return a * b
      }, 1)

      return rest.reduce((a, b) => {
        var result = []

        for (var i = 0; i < dimension; i++) {
          result.push(op(a[i], b[i]))
        }

        return result
      }, first)
    }
  }
}

module.exports = nAry
