var operators = require('./operators.json')
var staticProps = require('static-props')
var toData = require('./toData')
var tensorProduct = require('tensor-product')

/**
 * Creates a tensor space that is a class representing a tensor.
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (indices)
 */

function TensorSpace (Scalar) {
  var multiplication = Scalar.multiplication

  /**
   * @param {Array} indices
   */

  return function (indices) {
    // If dim equals 1 it is like a vector of dimension 1, that is a scalar.
    // Only dim greater than 1, represents a varying index  increase order.
    // A scalar has order 0.
    // A vector has order 1.
    // A matrix has order 2.
    // Order is also called "rank" or "tensor rank", but, to avoid confusion with
    // "matrix rank" it is better to call it "order".
    var order = indices.filter((dim) => dim > 1).length

    // TODO if it is a scalar, return the Scalar
    // which should be a composition algebra
    // Then add product tensor to composition algebras.
    // Finally, a tensor i,j,k should be constructed as the
    // tensor product of a scalar i,j,k times.
    var isScalar = (order === 0)

    var dimension = indices.reduce((a, b) => a * b, 1)

    if (isScalar) {
      staticProps(Scalar)({order: order})

      return Scalar
    }

    // TODO create one for square matrices
    // Create zero.
    var zero = indices.reduce((result, dim) => {
      for (var i = 0; i < dim; i++) {
        result.push(Scalar.zero)
      }

      return result
    }, [])

    /**
     * Tensor
     *
     * @class
     */

    function Tensor (data) {
      // validate data

      function validate (item) {
        if (Scalar.notContains(item)) {
          throw new TypeError('Invalid data = ' + item)
        }
      }

      data.forEach(validate)

      var enumerable = true
      staticProps(this)({ data }, enumerable)

      staticProps(this)({ order })
    }

    function staticBinary (operator) {
      Tensor[operator] = function () {
        var result = []

        for (var i = 0; i < dimension; i++) {
          var operands = []

          for (var j = 0; j < arguments.length; j++) {
            operands.push(toData(arguments[j])[i])
          }

          result.push(Scalar[operator].apply(null, operands))
        }

        return result
      }
    }

    var myBinaryOperators = ['addition', 'subtraction']

    myBinaryOperators.forEach((operator) => {
      staticBinary(operator)

      Tensor.prototype[operator] = function () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor[operator].apply(null, operands)

        var tensor = new Tensor(data)

        return tensor
      }
    })

    function scalarMultiplication (tensor, scalar) {
      var tensorData = toData(tensor)

      var result = []

      for (var i = 0; i < dimension; i++) {
        result.push(multiplication(tensorData[i], scalar))
      }

      return result
    }

    Tensor.scalarMultiplication = scalarMultiplication

    Tensor.prototype.scalarMultiplication = function (scalar) {
      var data = scalarMultiplication(this, scalar)

      return new Tensor(data)
    }

    Tensor.equality = function (tensor1, tensor2) {
      var tensorData1 = toData(tensor1)
      var tensorData2 = toData(tensor2)

      for (var i = 0; i < dimension; i++) {
        if (Scalar.disequality(tensorData1[i], tensorData2[i])) {
          return false
        }
      }

      return true
    }

    Tensor.prototype.equality = function (tensor2) {
      return Tensor.equality(this, tensor2)
    }

    Tensor.product = function (leftData) {
      return function (rightDim) {
        return function (rightData) {
          return tensorProduct(multiplication, indices, rightDim, leftData, rightData)
        }
      }
    }

    staticProps(Tensor)({
      order: order,
      zero: zero
    })

    var myOperators = operators.group

    myOperators.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Tensor[alias] = Tensor[operator]
        Tensor.prototype[alias] = Tensor.prototype[operator]
      })
    })

    return Tensor
  }
}

module.exports = TensorSpace
