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

function TensorSpace (indices) {
  // If dim equals 1 it is like a vector of dimension 1, that is a scalar.
  // Only dim greater than 1, represents a varying index  increase order.
  // A scalar has order 0.
  // A vector has order 1.
  // A matrix has order 2.
  // Order is also called "rank" or "tensor rank", but, to avoid confusion with
  // "matrix rank" it is better to call it "order".
  var order = indices.filter(dim => dim > 1).length

    // TODO if it is a scalar, return the Scalar
    // which should be a composition algebra
    // Then add product tensor to composition algebras.
    // Finally, a tensor i,j,k should be constructed as the
    // tensor product of a scalar i,j,k times.
  var isScalar = (order === 0)

  // TODO signature is (indices)(Scalar) it should be (Scalar)(indices
  // ) like Matrix and Vector space.
  return function (Scalar) {
    // TODO create one
    // Create zero.
    var zero = indices.reduce((result, dim) => {
      if (isScalar) {
        return Scalar.zero
      } else {
        for(var i = 0; i < dim; i++) {
          result.push(Scalar.zero)
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
      function check (item) {
        if (Scalar.notContains(item)) {
          throw new TypeError('Invalid data = ' + item)
        }
      }

      if (isScalar) {
        check(data)
      } else {
        data.forEach(check)
      }

      staticProps(this)({data: data})
    }

    function binary (operator) {
      Tensor[operator] = function () {
        return nAry(indices, Scalar[operator]).apply(null, arguments)
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
      return nAry(indices, Scalar.equality).apply(null, arguments)
    }

    Tensor.product = function (leftData) {
      return function (rightDim) {
        return function (rightData) {
          return tensorProduct(Scalar.multiplication, indices, rightDim, leftData, rightData)
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

module.exports = TensorSpace
