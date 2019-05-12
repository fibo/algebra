const determinant = require('laplace-determinant')
const multiplication = require('matrix-multiplication')
const multiDimArrayIndex = require('multidim-array-index')
const staticProps = require('static-props')
const tensorContraction = require('tensor-contraction')

const itemsPool = require('./itemsPool')
const toData = require('./toData')

/**
 * Space of m x n matrices
 *
 * ```
 * const R = algebra.R
 *
 * const R2x2 = algebra.MatrixSpace(R)(2)
 * ```
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace (Scalar) {
  const {
    addition,
    equality,
    subtraction
  } = Scalar

  const contraction = tensorContraction.bind(null, addition)

  const enumerable = true

  /**
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {class} Matrix
   */

  return function (numRows, numCols = numRows) {
    const dimension = numRows * numCols
    const indices = [numRows, numCols]
    const isSquare = (numRows === numCols)

    /**
     * Determinant computation is defined only if it is a square matrix.
     */

    function computeDeterminant (matrix) {
      const data = toData(matrix)

      return determinant(data, Scalar, numRows)
    }

    /**
     * Matrix addition is the scalar addition for every item.
     */

    function matrixAddition (matrix1, matrix2) {
      const matrixData1 = toData(matrix1)
      const matrixData2 = toData(matrix2)

      let result = []

      for (let i = 0; i < dimension; i++) {
        result.push(addition(matrixData1[i], matrixData2[i]))
      }

      return result
    }

    /**
     * Matrix equality checks that all elements are equal.
     * It also tries to check if numCols and numRows correspond.
     */

    function matrixEquality (matrix1, matrix2) {
      if (matrix1 instanceof Matrix && matrix2 instanceof Matrix) {
        if (matrix1.numCols !== matrix2.numCols) {
          return false
        }

        if (matrix1.numRows !== matrix2.numRows) {
          return false
        }
      }

      const matrixData1 = toData(matrix1)
      const matrixData2 = toData(matrix2)

      if (matrixData1.length !== matrixData2.length) {
        return false
      }

      for (let i = 0; i < dimension; i++) {
        if (!equality(matrixData1[i], matrixData2[i])) {
          return false
        }
      }

      return true
    }
    /**
     * Multiplies row by column to the right.
     *
     * @param {Object|Array} rightMatrix
     *
     * @returns {Object} matrix
     */

    function matrixMultiplication (leftMatrix, rightMatrix) {
      const leftMatrixData = toData(leftMatrix)
      const rightMatrixData = toData(rightMatrix)

      const rowByColumnMultiplication = multiplication(Scalar)(numCols)

      return rowByColumnMultiplication(leftMatrixData, rightMatrixData)
    }

    /**
     * Matrix subtraction is the scalar subtraction for every item.
     */

    function matrixSubtraction (matrix1, matrix2) {
      const matrixData1 = toData(matrix1)
      const matrixData2 = toData(matrix2)

      let result = []

      for (let i = 0; i < dimension; i++) {
        result.push(subtraction(matrixData1[i], matrixData2[i]))
      }

      return result
    }

    /**
     * Calculates the matrix trace.
     *
     * @see {@link https://en.wikipedia.org/wiki/Trace_(linear_algebra)}
     *
     * @param {Object|Array} matrix
     *
     * @returns {Object} scalar
     */

    function computeTrace (matrix) {
      const matrixData = toData(matrix)

      return contraction([0, 1], indices, matrixData)
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
      const transposedData = []

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const index = multiDimArrayIndex([numRows, numCols], [i, j])
          const transposedIndex = multiDimArrayIndex([numCols, numRows], [j, i])

          transposedData[transposedIndex] = matrixData[index]
        }
      }

      return transposedData
    }

    /**
     * Matrix element.
     */

    class Matrix {
      constructor (data) {
        staticProps(this)({
          data,
          numCols,
          numRows
        }, enumerable)

        staticProps(this)({
          Scalar,
          tr: () => this.transposed
        })

        if (isSquare) {
          staticProps(this)({
            determinant: () => {
              const result = computeDeterminant(this)

              return new Scalar(result)
            },

            trace: () => {
              const result = computeTrace(this)

              return new Scalar(result)
            }
          })
        }
      }

      equality (matrix) {
        return matrixEquality(this, matrix)
      }

      get transposed () {
        const transposedElements = transpose(this)

        // Get a class matrix in the transposed matrix space.
        // Note that numCols and numRows order as arguments is inverted.
        const TransposedMatrix = MatrixSpace(Scalar)(numCols, numRows)

        return new TransposedMatrix(transposedElements)
      }

      addition (matrix) {
        const result = matrixAddition(this, matrix)

        return new Matrix(result)
      }

      multiplication (matrix) {
        const result = matrixMultiplication(this, matrix)

        return new Matrix(result)
      }

      subtraction (matrix) {
        const result = matrixSubtraction(this, matrix)

        return new Matrix(result)
      }
    }

    // Method aliases.
    Matrix.prototype.add = Matrix.prototype.addition
    Matrix.prototype.eq = Matrix.prototype.equality
    Matrix.prototype.equal = Matrix.prototype.equality
    Matrix.prototype.mul = Matrix.prototype.multiplication
    Matrix.prototype.sub = Matrix.prototype.subtraction

    staticProps(Matrix)({
      numCols,
      numRows
    })

    // Matrix static operators.

    staticProps(Matrix)({
      addition: () => matrixAddition,
      equality: () => matrixEquality,
      multiplication: () => matrixMultiplication,
      subtraction: () => matrixSubtraction,
      transpose: () => transpose
    })

    staticProps(Matrix)({
      add: Matrix.addition,
      eq: Matrix.equality,
      mul: Matrix.multiplication,
      sub: Matrix.subtraction,
      tr: Matrix.transpose
    })

    if (isSquare) {
      Matrix.prototype.det = Matrix.prototype.determinant

      staticProps(Matrix)({
        determinant: () => computeDeterminant,
        trace: () => computeTrace
      })

      staticProps(Matrix)({
        det: Matrix.determinant
      })
    }

    return Matrix
  }
}

itemsPool.set('MatrixSpace', MatrixSpace)

module.exports = MatrixSpace
