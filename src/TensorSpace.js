var AbstractTensor = require('./Tensor')
var coerced = require('./coerced')

function TensorSpace (indices, type) {
  var isScalar = ((indices.length === 1) && (indices[0] === 1))

  return function (ring) {
    // Create zero.
    const zero = indices.reduce((result, dim) => {
      if (isScalar) {
        return ring.zero
      } else {
        for(var i = 0; i < dim; i++) {
          result.push(ring.zero)
        }

        return result
      }
    }, [])

    function nAry (operator) {
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

    class Tensor extends AbstractTensor {
      constructor (data) {
        super(indices, type, ring)

      }

      static addition () {
        return nAry(ring.addition).apply(null, arguments)
      }

      static add () {
        return nAry(ring.addition).apply(null, arguments)
      }

      static subtraction () {
        return nAry(ring.subtraction).apply(null, arguments)
      }

      static sub () {
        return nAry(ring.subtraction).apply(null, arguments)
      }
    }

    Object.defineProperty(Tensor, 'zero', {
      writable: false,
      value: zero
    })

    return Tensor
  }
}

module.exports = TensorSpace
