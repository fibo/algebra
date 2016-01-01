var nAry = require('./nAry')
var tensorProduct = require('tensor-product')

/**
 * Creates a tensor space that is a class representing a tensor.
 *
 * @param {Array} indices
 * @returns {Function}
 */

function tensorSpace (indices) {
  // If dim equals 1 it is like a vector of dimension 1, that is a scalar.
  // Only dim greater than 1, represents a varying index  increase order.
  // A scalar has order 0.
  // A vector has order 1.
  // A matrix has order 2.
  // Order is also called "rank" or "tensor rank", but, to avoid confusion with
  // "matrix rank" it is better to call it "order".
  const order = indices.filter((dim) => {
    return dim > 1
  }).length

  const isScalar = (order === 0)

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

    /**
     * Tensor
     *
     * @class
     */

    class Tensor {
      constructor (data) {
        this.data = data
      }

      addition () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor.addition.apply(null, operands)

        return new Tensor(data)
      }

      add () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor.addition.apply(null, operands)

        return new Tensor(data)
      }

      subtraction () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor.subtraction.apply(null, operands)

        return new Tensor(data)
      }

      sub () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor.subtraction.apply(null, operands)

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

      static product (leftData) {
        return function (rightDim) {
          return function (rightData) {
            return tensorProduct(ring.multiplication, indices, rightDim, leftData, rightData)
          }
        }
      }
    }

    Object.defineProperty(Tensor, 'zero', {
      writable: false,
      value: zero
    })

    Object.defineProperty(Tensor, 'order', {
      writable: false,
      value: order
    })

    return Tensor
  }
}

module.exports = tensorSpace
