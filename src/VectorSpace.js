
var algebraGroup              = require('algebra-group'),
    coerced                   = require('./coerced'),
    comparison                = require('./comparison'),
    Element                   = require('./Element'),
    inherits                  = require('inherits'),
    itemsPool                 = require('./itemsPool'),
    method                    = require('./method'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    toData                    = require('./toData')
var TensorSpace = require('./TensorSpace')

var operators = require('./operators.json')

var nAryMethod  = method.nAry,
    unaryMethod = method.unary

/**
 * Space of vectors
 *
 * ```
 * var V = VectorSpace(R)(2)
 *
 * var v = new V([1, 2])
 * ```
 *
 * @param {Object} field
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (field) {

  /**
   * @api private
   *
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    var AbstractVector = TensorSpace([dimension])(field)

    function Vector (data) {
      AbstractVector.call(this, data)
    }

    inherits(Vector, AbstractVector)

    operators.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

    return Vector
  }
}

module.exports = VectorSpace

      /**
       * Norm of a vector
       *
       * Given v = (x1, x2, ... xN)
       *
       * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
       *
       * @api private
       *
       * @returns {Scalar} result

      function vectorNorm () {
        var result = Scalar.multiplication(data[0], data[0])

        for (var i = 1; i < dimension; i++)
          result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))

        return new Scalar(result)
      }

      Object.defineProperty(this, 'norm', {get: vectorNorm})
       */

    /**
     * @api private

    function crossProduct (right) {
      var rightData      = toData(right)

            // TODO complete cross product
    }

    // Cross product is defined only in dimension 3.
    if (dimension === 3) {
      Vector.prototype.crossProduct = crossProduct
      Vector.prototype.cross        = crossProduct
      Vector.prototype.x            = crossProduct
    }
     */

    /**
     * @api private

    function scalarProduct (vector1, vector2) {
      var vectorData1    = toData(vector1),
          vectorData2    = toData(vector2)

      if (vectorData1.length !== vectorData2.length)
        throw new TypeError('Vectors has not the same dimension')

      var result = Scalar.multiplication(vectorData1[0], vectorData2[0])

      for (var i = 1; i < dimension; i++) {
        result = Scalar.addition(result, Scalar.multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }
     */

    /**
     * @api private

    function vectorScalarProduct (vector) {
      var result = scalarProduct(this.data, vector)

      return new Scalar(result)
    }

    Vector.prototype.scalarProduct = vectorScalarProduct
     */

    /**
     * @api private

    function perScalarProduct (Scalar) {
      var data       = this.data,
          ScalarData = toData(Scalar)

      for (var i = 0; i < dimension; i++)
        data[i] = Scalar.mul(data[i], ScalarData)

      this.data = data

      return this
    }

    Vector.prototype.perScalarProduct = perScalarProduct
     */

    /**
     * Transpose a column-vector to a row-vector
     *
     * If you want to multiply at right a vector by a matrix you need to transpose it.
     *
     * @api private
     *
     * @returns {Object} Matrix

    function transpose () {
      var data   = this.data

      var MatrixSpace = itemsPool.getMatrixSpace()

      var Matrix = MatrixSpace(Scalar)(1, dimension)

      return new Matrix(data)
    }

    Vector.prototype.transpose = transpose
     */
