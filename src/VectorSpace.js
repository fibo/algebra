const itemsPool = require('./itemsPool')
const matrixMultiplication = require('matrix-multiplication')
const staticProps = require('static-props')
const toData = require('./toData')

/**
 * Space of vectors
 *
 * ```
 * const V = VectorSpace(R)(2)
 *
 * const v = new V([1, 2])
 * ```
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (Scalar) {
  const {
    addition,
    multiplication,
    subtraction
  } = Scalar

  const enumerable = true

  /**
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    /**
     * Vector addition is the scalar addition for every coordinate.
     */

    function vectorAddition (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      let result = []

      for (let i = 0; i < dimension; i++) {
        result.push(addition(vectorData1[i], vectorData2[i]))
      }

      return result
    }

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
     * Multiply a column vector by matrix on right side
     *
     * @returns {Object} scalar
     * @param leftVector
     * @param rightMatrix
     */

    function multiplicationByMatrix (leftVector, rightMatrix) {
      const leftVectorData = toData(leftVector)
      const rightMatrixData = toData(rightMatrix)

      const rowByColumnMultiplication = matrixMultiplication(Scalar)(dimension)

      return rowByColumnMultiplication(leftVectorData, rightMatrixData)
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
     * @see {@link https://en.wikipedia.org/wiki/Dot_product}
     *
     * @param {Object|Array} vector1
     * @param {Object|Array} vector2
     *
     * @returns {*} scalar
     */

    function scalarProduct (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      if (vectorData1.length !== vectorData2.length) {
        throw new TypeError('Vectors have not the same dimension')
      }

      let result = multiplication(vectorData1[0], vectorData2[0])

      for (let i = 1; i < dimension; i++) {
        result = addition(result, multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * Vector subtraction is the scalar subtraction for every coordinate.
     */

    function vectorSubtraction (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      let result = []

      for (let i = 0; i < dimension; i++) {
        result.push(subtraction(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * Vector element.
     */

    class Vector {
      constructor (data) {
        staticProps(this)({ data }, enumerable)

        staticProps(this)({
          norm: norm(data),
          dimension
        })
      }

      addition () {
        const operands = [this].concat([].slice.call(arguments))

        const result = operands.reduce((result, vector) => vectorAddition(result, vector))

        return new Vector(result)
      }

      multiplication (rightMatrix) {
        const MatrixSpace = itemsPool.get('MatrixSpace')

        const leftVectorData = this.data
        const result = multiplicationByMatrix(leftVectorData, rightMatrix)

        const rightNumRows = dimension
        const rightNumCols = result.length / rightNumRows

        const Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

        return new Matrix(result)
      }

      scalarProduct (vector) {
        const result = scalarProduct(this, vector)

        return new Scalar(result)
      }

      subtraction () {
        const operands = [this].concat([].slice.call(arguments))

        const result = operands.reduce((result, vector) => vectorSubtraction(result, vector))

        return new Vector(result)
      }
    }

    staticProps(Vector)({
      dimension
    }, enumerable)

    // Method aliases.

    Vector.prototype.add = Vector.prototype.addition
    Vector.prototype.mul = Vector.prototype.multiplication
    Vector.prototype.scalar = Vector.prototype.scalarProduct
    Vector.prototype.sub = Vector.prototype.subtraction

    // Vector static operators.

    function staticAddition () {
      const operands = [].slice.call(arguments)

      const result = operands.reduce((result, vector) => vectorAddition(result, vector))

      return result
    }

    function staticSubtraction () {
      const operands = [].slice.call(arguments)

      const result = operands.reduce((result, vector) => vectorSubtraction(result, vector))

      return result
    }

    staticProps(Vector)({
      add: () => staticAddition,
      addition: () => staticAddition,
      mul: () => multiplicationByMatrix,
      multiplication: () => multiplicationByMatrix,
      norm: () => norm,
      scalar: () => scalarProduct,
      scalarProduct: () => scalarProduct,
      sub: () => staticSubtraction,
      subtraction: () => staticSubtraction
    })

    function crossProductMethod (vector) {
      const data = this.data

      const result = crossProduct(data, vector)

      return new Vector(result)
    }

    if (dimension === 3) {
      Vector.prototype.cross = crossProductMethod
      Vector.prototype.crossProduct = crossProductMethod

      staticProps(Vector)({
        crossProduct: () => crossProduct,
        cross: () => crossProduct
      })
    }

    return Vector
  }
}

itemsPool.set('VectorSpace', VectorSpace)

module.exports = VectorSpace
