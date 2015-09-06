
var getIndices                = require('./getIndices'),
    group                     = require('./group'),
    inherits                  = require('inherits'),
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
 * @param {Object} Scalar class
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (Scalar) {

  /*!
   *
   * @param {Number} dimension
   *
   * @returns {Constructor} Vector
   */

  return function (dimension) {

    function createZero (scalarZero, dimension) {
      var vectorZero = []

      for (var i = 0; i < dimension; i++)
        vectorZero.push(scalarZero)

     return vectorZero
    }

    var zero = createZero(Scalar.zero, dimension)

    function contains (a) {
      if (a.length !== dimension) return false

      for (var i = 0; i < dimension; i++)
        if (! Scalar.contains(a[i]))
          return false

      return true
    }

    function equality (a, b) {
      for (var i = 0; i < dimension; i++)
        if (! Scalar.equality(a[i], b[i]))
          return false

      return true
    }

    function addition (a, b) {
      var c = []

      for (var i = 0; i < dimension; i++)
        c.push(Scalar.addition(a[i], b[i]))

      return c
    }

    function negation (a) {
      var b = []

      for (var i = 0; i < dimension; i++)
        b.push(Scalar.negation(a[i]))

      return b
    }

    var Group = group({
      identity       : zero,
      contains       : contains,
      equality       : equality,
      compositionLaw : addition,
      inversion      : negation
    })

    /**
     *
     * @class
     *
     * @param {*} data
     */

    function Vector (data) {
      Group.call(this, data)

      /**
       * Norm of a vector
       *
       * Given v = (x1, x2, ... xN)
       *
       * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
       *
       * @returns {Scalar} result
       */

      function vectorNorm () {
        var result = Scalar.multiplication(data[0], data[0])

        for (var i = 1; i < dimension; i++) {
          result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))
        }

        return new Scalar(result)
      }

      Object.defineProperty(this, 'norm', {get: vectorNorm})
    }

    inherits(Vector, Group)

    Vector.addition = Group.addition
    Vector.subtraction = Group.subtraction
    Vector.negation = Group.negation

    Object.defineProperty(Vector, 'zero', {
      writable: false,
      value: zero
    })

    function crossProduct (right) {
      var rightData      = toData(right),
          rightDimension = rightData.length,
          rightIndices   = getIndices(right)

            // TODO complete cross product
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

      for (var i = 1; i < dimension; i++) {
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

    function perScalarProduct (Scalar) {
      var data       = this.data,
          ScalarData = toData(Scalar)

      for (var i = 0; i < dimension; i++)
        data[i] = Scalar.mul(data[i], ScalarData)

      this.data = data

      return this
    }

    Vector.prototype.perScalarProduct = perScalarProduct

    Vector.scalarProduct = scalarProduct

    return Vector
  }
}

module.exports = VectorSpace

