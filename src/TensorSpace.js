var nAry = require('./nAry')
var operators = require('./operators.json')
var staticProps = require('static-props')
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
  var order = indices.filter(dim => dim > 1).length

  var isScalar = (order === 0)

  return function (ring) {
    // Create zero.
    var zero = indices.reduce((result, dim) => {
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

    function Tensor (data) {
      this.data = data
    }

    function binary (operator) {
      Tensor[operator] = function () {
        return nAry(indices, ring[operator]).apply(null, arguments)
      }

      Tensor.prototype[operator] = function () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor[operator].apply(null, operands)

        return new Tensor(data)
      }
    }

    var myBinaryOperators = ['addition', 'subtraction']

    myBinaryOperators.forEach(binary)

    Tensor.equality = function () {
      return nAry(indices, ring.equality).apply(null, arguments)
    }

    Tensor.product = function (leftData) {
      return function (rightDim) {
        return function (rightData) {
          return tensorProduct(ring.multiplication, indices, rightDim, leftData, rightData)
        }
      }
    }

    staticProps(Tensor)({
      order: order,
      zero: zero
    })

    operators.group.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Tensor[alias] = Tensor[operator]
        Tensor.prototype[alias] = Tensor.prototype[operator]
      })
    })

    return Tensor
  }
}

module.exports = tensorSpace
