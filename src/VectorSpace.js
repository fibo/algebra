
var inherits = require('inherits')

var getIndices                = require('./getIndices'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData')


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
 * @return {Function} Dimension
 */

function VectorSpace (Scalar) {

  /*!
   * Dimension
   *
   * @param {Number} dimension
   *
   * @return {Constructor} Vector
   */

  function Dimension (dimension) {
    var Element = Space(Scalar)([dimension])

    function Vector () {
      Element.apply(this, arguments)

      var data = this.data

      /*!
       * Norm of a vector
       *
       * Given v = (x1, x2, ... xN)
       *
       * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
       *
       * @return {Scalar} result
       */

      function vectorNorm () {
        var result = Scalar.multiplication(data[0], data[0])

        for (var i=1; i<dimension; i++) {
          result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))
        }

        return new Scalar(result)
      }

      Object.defineProperty(this, 'norm', {get: vectorNorm})
    }

    inherits(Vector, Element)

    /*!
     *
     */

    function crossProduct (right) {
      var rightData      = toData(right),
          rightDimension = rightData.length,
          rightIndices   = getIndices(right)

    }

    // Cross product is defined only in dimension 3.
    if (dimension === 3) {
      Vector.prototype.crossProduct = crossProduct
      Vector.prototype.cross        = crossProduct
      Vector.prototype.x            = crossProduct
    }

    /*!
     *
     */

    function matrixProduct (matrix) {
      var matrixData    = toData(matrix),
          matrixIndices = getIndices(matrix)

      var indices = [1, dimension]

      var data = rowByColumnMultiplication(Scalar, this.data, indices, matrixData, matrixIndices)

      this.data = data

      return this
    }

    Vector.prototype.matrixProduct = matrixProduct

    /*!
     *
     */

    function scalarProduct (vector) {
      var data          = this.data,
          vectorData    = toData(vector),
          vectorIndices = getIndices(vector)

      if (dimension !== vectorData.length)
        throw new TypeError('Vector has not the same dimension')

      var result = Scalar.multiplication(data[0], vectorData[0])

      for (var i=1; i<dimension; i++) {
        result = Scalar.addition(result, Scalar.multiplication(data[i], vectorData[i]))
      }

      return new Scalar(result)
    }

    Vector.prototype.scalarProduct = scalarProduct
    Vector.prototype.dotProduct    = scalarProduct
    Vector.prototype.dot           = scalarProduct

    /*!
     *
     */

    function perScalarProduct (scalar) {
      var data       = this.data,
          scalarData = toData(scalar)

      for (var i = 0; i < dimension; i++)
        data[i] = Scalar.mul(data[i], scalarData)

      this.data = data

      return this
    }

    Vector.prototype.perScalarProduct = perScalarProduct

    /*!
     *
     */

    Vector.addition    = Element.addition
    Vector.add         = Element.addition
    Vector.subtraction = Element.subtraction
    Vector.sub         = Element.subtraction

    return Vector
  }

  return Dimension
}

module.exports = VectorSpace

