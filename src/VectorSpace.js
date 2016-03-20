var inherits  = require('inherits')
var operators = require('./operators.json')
var staticProps = require('static-props')
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
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (Scalar) {
  var addition = Scalar.addition
  var multiplication = Scalar.multiplication

  /**
   * @api private
   *
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    var AbstractVector = TensorSpace([dimension])(Scalar)

    /**
     */

    function crossProduct () {
      // TODO complete cross product
    }

    /**
     * Norm of a vector
     *
     * Given v = (x1, x2, ... xN)
     *
     * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
     *
     * @param {Object|Array} vector
     *
     * @returns {Object} scalar
     */

    function norm (vector) {
      var data = toData(vector)

      var value = multiplication(data[0], data[0])

      for (var i = 1; i < dimension; i++) {
        value = addition(value, multiplication(data[i], data[i]))
      }

      return new Scalar(value)
    }

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

      if (vectorData1.length !== vectorData2.length) {
        throw new TypeError('Vectors have not the same dimension')
      }

      var result = multiplication(vectorData1[0], vectorData2[0])

      for (var i = 1; i < dimension; i++) {
        result = addition(result, multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * @class
     */

    function Vector (data) {
      AbstractVector.call(this, data)

      staticProps(this)({
        norm: norm(data),
        dimension: dimension
      })
    }

    inherits(Vector, AbstractVector)

    Vector.prototype.scalarProduct = function (vector) {
      var data = this.data

      var result = scalarProduct(data, vector)

      return new Scalar(result)
    }

    // Cross product is defined only in dimension 3.
    function crossProductMethod (vector) {
      var data = this.data

      var result = crossProduct(data, vector)

      return new Vector(result)
 n   }

    if (dimension === 3) {
      Vector.crossProduct = crossProduct

      Vector.prototype.crossProduct = crossProductMethod
      Vector.prototype.cross = crossProductMethod
    }

    // Static operators.

    Vector.norm = norm
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

    if (dimension === 3) {
      Vector.cross = crossProduct
    }

    return Vector
  }
}

module.exports = VectorSpace

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
