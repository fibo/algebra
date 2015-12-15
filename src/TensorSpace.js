var nAry = require('./nAry')

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


    class Tensor {
      constructor (data) {
        this.data = data
      }

      addition () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = nAry(indices, ring.addition).call(null, operands)

        return new Tensor(data)
      }

      static equality () {
        return nAry(indices, ring.equality).apply(null, arguments)
      }

      static eq () {
        return nAry(indices, ring.equality).apply(null, arguments)
      }

      static addition () {
        return nAry(indices, ring.addition).apply(null, arguments)
      }

      static add () {
        return nAry(indices, ring.addition).apply(null, arguments)
      }

      static subtraction () {
        return nAry(indices, ring.subtraction).apply(null, arguments)
      }

      static sub () {
        return nAry(indices, ring.subtraction).apply(null, arguments)
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
