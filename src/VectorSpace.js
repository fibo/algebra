
var algebraGroup              = require('algebra-group'),
    coerced                   = require('./coerced'),
    comparison                = require('./comparison'),
    Element                   = require('./Element'),
    itemsPool                 = require('./itemsPool'),
    method                    = require('./method'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    toData                    = require('./toData')

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
 * @param {Object} Scalar class
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (Scalar) {

  /**
   * @api private
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

    function _contains (a) {
      if (a.length !== dimension) return false

      for (var i = 0; i < dimension; i++)
        if (! Scalar.contains(a[i]))
          return false

      return true
    }

    function _equality (a, b) {
      for (var i = 0; i < dimension; i++)
        if (! Scalar.equality(a[i], b[i]))
          return false

      return true
    }

    function _addition (a, b) {
      var c = []

      for (var i = 0; i < dimension; i++)
        c.push(Scalar.addition(a[i], b[i]))

      return c
    }

    function _negation (a) {
      var b = []

      for (var i = 0; i < dimension; i++)
        b.push(Scalar.negation(a[i]))

      return b
    }

    var g = algebraGroup({
      identity       : zero,
      contains       : _contains,
      equality       : _equality,
      compositionLaw : _addition,
      inversion      : _negation
    })

    var addition    = coerced(g.addition),
        contains    = coerced(g.contains),
        disequality = coerced(g.disequality),
        equality    = coerced(g.equality),
        negation    = coerced(g.negation),
        notContains = coerced(g.notContains),
        subtraction = coerced(g.subtraction)

    /**
     * Vector
     *
     * Inherits from [Element](#element).
     *
     * @param {*} data
     */

    class Vector extends Element {
      constructor (data) {
        super(data, contains)

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
         */

        function vectorNorm () {
          var result = Scalar.multiplication(data[0], data[0])

          for (var i = 1; i < dimension; i++)
            result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))

          return new Scalar(result)
        }

        Object.defineProperty(this, 'norm', {get: vectorNorm})
      }
    }

    // Static attributes.

    Object.defineProperty(Vector, 'zero', {
      writable: false,
      value: zero
    })

    /**
     * @api private
     */

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

  // TODO staticRightMultiplication by a matrix

    /**
     * @api private
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

    /**
     * @api private
     */

    function vectorScalarProduct (vector) {
      var result = scalarProduct(this.data, vector)

      return new Scalar(result)
    }

    Vector.prototype.scalarProduct = vectorScalarProduct

    /**
     * @api private
     */

    function perScalarProduct (Scalar) {
      var data       = this.data,
          ScalarData = toData(Scalar)

      for (var i = 0; i < dimension; i++)
        data[i] = Scalar.mul(data[i], ScalarData)

      this.data = data

      return this
    }

    Vector.prototype.perScalarProduct = perScalarProduct

    /**
     * Transpose a column-vector to a row-vector
     *
     * If you want to multiply at right a vector by a matrix you need to transpose it.
     *
     * @api private
     *
     * @returns {Object} Matrix
     */

    function transpose () {
      var data   = this.data

      var MatrixSpace = itemsPool.getMatrixSpace()

      var Matrix = MatrixSpace(Scalar)(1, dimension)

      return new Matrix(data)
    }

    Vector.prototype.transpose = transpose

    // Comparison operators.

    Vector.prototype.equality    = comparison(equality)
    Vector.prototype.disequality = comparison(disequality)

    // Chainable class methods.

    Vector.prototype.addition    = nAryMethod(addition, Vector)
    Vector.prototype.subtraction = nAryMethod(subtraction, Vector)
    Vector.prototype.negation    = unaryMethod(negation, Vector)

    // Static operators.

    Vector.contains    = contains
    Vector.disequality = disequality
    Vector.equality    = equality
    Vector.notContains = notContains

    Vector.addition    = addition
    Vector.subtraction = subtraction
    Vector.negation    = negation

    Vector.scalarProduct = scalarProduct

    // Aliases

    Vector.eq = Vector.equality
    Vector.ne = Vector.disequality

    Vector.equal    = Vector.equality
    Vector.notEqual = Vector.disequality
    Vector.notEq    = Vector.disequality

    Vector.add = Vector.addition
    Vector.neg = Vector.negation
    Vector.sub = Vector.subtraction

    Vector.prototype.add = Vector.prototype.addition
    Vector.prototype.neg = Vector.prototype.negation
    Vector.prototype.sub = Vector.prototype.subtraction

    Vector.prototype.dotProduct = vectorScalarProduct
    Vector.prototype.dot        = vectorScalarProduct

    return Vector
  }
}

itemsPool.setVectorSpace(VectorSpace)

module.exports = VectorSpace

