var inherits  = require('inherits')
var operators = require('./operators.json')
var TensorSpace = require('./TensorSpace')
var toData = require('./toData')

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
    var Scalar = TensorSpace([1])(field)

    /**
     * Scalar product
     *
     * https://en.wikipedia.org/wiki/Dot_product
     *
     * @param {Object|Array} vector1
     * @param {Object|Array} vector2
     *
     * @returns {*} scalar
     */

    function scalarProduct (vector1, vector2) {
      // TODO use tensor product and then contraction (trace)
      var vectorData1 = toData(vector1)
      var vectorData2 = toData(vector2)

      if (vectorData1.length !== vectorData2.length)
        throw new TypeError('Vectors have not the same dimension')

      var result = field.multiplication(vectorData1[0], vectorData2[0])

      for (var i = 1; i < dimension; i++) {
        result = field.addition(result, field.multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * @class
     */

    function Vector (data) {
      AbstractVector.call(this, data)
    }

    inherits(Vector, AbstractVector)

    Vector.prototype.scalarProduct = function (vector2) {
      var data = this.data

      var result = scalarProduct(data, vector2)

      return new Scalar(result)
    }

    // Static operators.

    Vector.scalarProduct = scalarProduct

    operators.group.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

    // Aliases

    var myOperators = ['scalarProduct'].concat(operators.group)

    myOperators.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Vector[alias] = Vector[operator]
        Vector.prototype[alias] = Vector.prototype[operator]
      })
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
