const determinant = require('laplace-determinant')
const inherits = require('inherits')
const itemsPool = require('./itemsPool')
const matrixMultiplication = require('matrix-multiplication')
const multiDimArrayIndex = require('multidim-array-index')
const no = require('not-defined')
const operators = require('./operators.json')
const staticProps = require('static-props')
const TensorSpace = require('./TensorSpace')
const tensorContraction = require('tensor-contraction')
const toData = require('./toData')

/**
 * Space of m x n matrices
 *
 * ```
 * var R = algebra.R
 *
 * var R2x2 = algebra.MatrixSpace(R)(2)
 * ```
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace (Scalar) {
  var contraction = tensorContraction.bind(null, Scalar.addition)

  /**
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {Function} Matrix
   */

  return function (numRows, numCols) {
    // numCols defaults to numRows
    if (no(numCols)) numCols = numRows

    const isSquare = (numRows === numCols)
    const indices = [numRows, numCols]

    const AbstractMatrix = TensorSpace(Scalar)(indices)

    /**
     * Calculates the matrix trace.
     *
     * https://en.wikipedia.org/wiki/Trace_(linear_algebra)
     *
     * @param {Object|Array} matrix
     *
     * @returns {Object} scalar
     */

    function trace (matrix) {
      const matrixData = toData(matrix)

      return contraction([0, 1], indices, matrixData)
    }

    /**
     * Multiplies row by column to the right.
     *
     * @param {Object|Array} rightMatrix
     *
     * @returns {Object} matrix
     */

    function multiplication (leftMatrix, rightMatrix) {
      const leftMatrixData = toData(leftMatrix)
      const rightMatrixData = toData(rightMatrix)

      const rowByColumnMultiplication = matrixMultiplication(Scalar)(numCols)

      return rowByColumnMultiplication(leftMatrixData, rightMatrixData)
    }

    /**
     * Calculates the transpose of a matrix.
     *
     * @param {Object|Array} matrix
     *
     * @returns {Array} matrix
     */

    function transpose (matrix) {
      const matrixData = toData(matrix)
      let transposedData = []

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let index = multiDimArrayIndex([numRows, numCols], [i, j])
          let transposedIndex = multiDimArrayIndex([numCols, numRows], [j, i])

          transposedData[transposedIndex] = matrixData[index]
        }
      }

      return transposedData
    }

    /**
     * Matrix element.
     */

    function Matrix (data) {
      AbstractMatrix.call(this, data)

      staticProps(this)({
        numCols,
        numRows
      })

      function computeDeterminant () {
        var det = determinant(data, Scalar, numRows)

        return new Scalar(det)
      }

      if (isSquare) {
        staticProps(this)({
          trace: trace(data)
        })

        staticProps(this)({
          determinant: computeDeterminant,
          det: computeDeterminant
        })
      }

      function transposed () {
        const result = transpose(data)
        const VectorSpace = itemsPool.get('VectorSpace')

        if (numRows === 1) {
          const Vector = VectorSpace(Scalar)(numCols)
          return new Vector(result)
        } else {
          const Matrix = MatrixSpace(Scalar)(numCols, numRows)
          return new Matrix(result)
        }
      }

      staticProps(this)({
        transposed,
        tr: transposed
      })
    }

    inherits(Matrix, AbstractMatrix)

    if (isSquare) {
      Matrix.trace = trace
    }

    Matrix.prototype.multiplication = function (rightMatrix) {
      var leftMatrixData = this.data
      var result = multiplication(leftMatrixData, rightMatrix)

      var rightNumRows = numCols
      var rightNumCols = result.length / rightNumRows

      var Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

      return new Matrix(result)
    }

    // Static operators.

    Matrix.multiplication = multiplication
    Matrix.transpose = transpose

    // Aliases

    Matrix.tr = Matrix.transpose
    Matrix.mul = Matrix.multiplication

    Matrix.prototype.mul = Matrix.prototype.multiplication

    operators.group.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Matrix[alias] = Matrix[operator]
        Matrix.prototype[alias] = Matrix.prototype[operator]
      })
    })

    operators.group.forEach((operator) => {
      Matrix[operator] = AbstractMatrix[operator]
    })

    staticProps(Matrix)({
      numCols,
      numRows
    })

    return Matrix
  }
}

itemsPool.set('MatrixSpace', MatrixSpace)

module.exports = MatrixSpace
