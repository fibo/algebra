
var inherits = require('inherits')

var getIndices                = require('./getIndices'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
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
 * @function
 *
 * @param {Object} Scalar
 *
 * @returns {Function} Dimension
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
    var indices = [dimension]

    var Element = Space(Scalar)(indices)

    /**
     *
     * @class
     *
     * @param {*} data
     */

    function Vector (data) {
      Element.call(this, data)

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

    function scalarProduct (vector1, vector2) {
      var vectorData1    = toData(vector1),
          vectorData2    = toData(vector2)

      if (vectorData1.length !== vectorData2.length)
        throw new TypeError('Vectors has not the same dimension')

      var result = Scalar.multiplication(vectorData1[0], vectorData2[0])

      for (var i=1; i<dimension; i++) {
        result = Scalar.addition(result, Scalar.multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    function vectorScalarProduct (vector) {
      var result = scalarProduct(this.data, vector)

      return new Scalar(result)
    }

    Vector.prototype.scalarProduct = vectorScalarProduct
    Vector.prototype.dotProduct    = vectorScalarProduct
    Vector.prototype.dot           = vectorScalarProduct

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
     * Static operators
     */

    Vector.addition    = Element.addition
    Vector.add         = Element.addition
    Vector.subtraction = Element.subtraction
    Vector.sub         = Element.subtraction

    Vector.scalarProduct = scalarProduct

    return Vector
  }

  return Dimension
}

module.exports = VectorSpace

