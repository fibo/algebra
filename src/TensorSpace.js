var AbstractTensor = require('./Tensor')
var coerced = require('./coerced')

function TensorSpace (indices, rank) {
  return function (ring) {
    // Create zero.
    var zero = indices.reduce((result, dim) => {
      for(var i = 0; i < dim; i++) {
        result.push(ring.zero)
      }

      return result
    }, [])

    class Tensor extends AbstractTensor {
      constructor (data) {
        super(indices, rank, ring)
      }

      static addition () {
        var isScalar = ((indices.length === 1) && (indices[0] === 1))

        if (isScalar) {
          return coerced(ring.addition).apply(null, arguments)
        }
        else {
          var args = [].slice.call(arguments, 0)
          var dimension = indices[0]

          return args.reduce((a, b) => {
            var result = []

            for (var i = 0; i < dimension; i++) {
              result.push(coerced(ring.addition)(a[i], b[i]))
            }

            return result
          }, zero)
        }
      }
    }

    return Tensor
  }
}

module.exports = TensorSpace
