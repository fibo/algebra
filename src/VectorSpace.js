const inherits = require('inherits')
const operators = require('./operators.json')
const staticProps = require('static-props')
const TensorSpace = require('./TensorSpace')
const toData = require('./toData')

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
  const addition = Scalar.addition
  const multiplication = Scalar.multiplication
  const subtraction = Scalar.subtraction

  /**
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    const indices = [dimension]

    const AbstractVector = TensorSpace(Scalar)(indices)

    /**
     * Computes the cross product of two vectors.
     *
     * It is defined only in dimension 3.
     *
     * @param {Object|Array} vector1
     * @param {Object|Array} vector2
     *
     * @returns {Array} vector
     */

    function crossProduct (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      const ux = vectorData1[0]
      const uy = vectorData1[1]
      const uz = vectorData1[2]

      const vx = vectorData2[0]
      const vy = vectorData2[1]
      const vz = vectorData2[2]

      let vector = []

      vector.push(subtraction(multiplication(uy, vz), multiplication(uz, vy)))
      vector.push(subtraction(multiplication(uz, vx), multiplication(ux, vz)))
      vector.push(subtraction(multiplication(ux, vy), multiplication(uy, vx)))

      return vector
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
      const data = toData(vector)

      let value = multiplication(data[0], data[0])

      for (let i = 1; i < dimension; i++) {
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
    }

    if (dimension === 3) {
      Vector.crossProduct = crossProduct

      Vector.prototype.crossProduct = crossProductMethod
      Vector.prototype.cross = crossProductMethod
    }

    // Static operators.

    Vector.norm = norm
    Vector.scalarProduct = scalarProduct

    operators.comparison.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

    operators.set.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

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
