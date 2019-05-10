const determinant = require('laplace-determinant')
const itemsPool = require('./itemsPool')
const matrixMultiplication = require('matrix-multiplication')
const multiDimArrayIndex = require('multidim-array-index')
const no = require('not-defined')
const operators = require('./operators.json')
const staticProps = require('static-props')
const tensorContraction = require('tensor-contraction')
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
  const contraction = tensorContraction.bind(null, Scalar.addition)

  // Operator filters.
  const matrixOperators = ({ categories }) => categories.includes('matrix')
  const groupOperators = ({ categories }) => categories.includes('group')

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

    /**
     * Calculates the matrix trace.
     *
     * @see {@link https://en.wikipedia.org/wiki/Trace_(linear_algebra)}
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

    function staticGroupBinary (operatorName) {
      return function (leftMatrix, rightMatrix) {
        if (leftMatrix.numCols === rightMatrix.numCols && leftMatrix.numRows === rightMatrix.numRows) {
          const { numCols, numRows } = leftMatrix
          const operands = []
          const result = []

          for (let i = 0; i < numRows * numCols; i++) {
            for (let j = 0; j < arguments.length; j++) {
              operands.push(toData(arguments[j])[i])
            }

            result.push(Scalar[operatorName].apply(null, operands))
          }

          return result
        } else {
          return new TypeError('Incompatible matrices')
        }
      }
    }

    function computeDeterminant (data) {
      const det = determinant(data, Scalar, numRows)

      return new Scalar(det)
    }

    /**
     * Matrix element.
     */

    function Matrix (data) {
      staticProps(this)({
        data,
        numCols,
        numRows
      }, true)

      operators.filter(matrixOperators).filter(groupOperators).forEach(operator => {
        const isBinary = operator.categories.includes('binary')
        const isClosed = operator.isClosed
        const isInstanceMethod = operator.isInstanceMethod
        const isStaticMethod = operator.isStaticMethod
        const isUnary = operator.categories.includes('unary')
        const operatorName = operator.name

        if (isBinary) {
          if (isInstanceMethod) {
            Matrix.prototype[operatorName] = function () {
              const args = [].slice.call(arguments)
              const operands = [this.data].concat(args)

              const data = staticGroupBinary(operatorName).apply(null, operands)

              if (isClosed) {
                return new Matrix(data)
              } else {
                return data
              }
            }
          }

          if (isStaticMethod) {
            Matrix[operatorName] = staticGroupBinary(operatorName)
          }
        }

        if (isUnary) {
          if (isInstanceMethod) {

          }

          if (isStaticMethod) {
          }
        }
      })

      if (isSquare) {
        staticProps(this)({
          trace: trace(data)
        })

        staticProps(this)({
          determinant: computeDeterminant
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

    if (isSquare) {
      Matrix.trace = trace
    }

    Matrix.prototype.multiplication = function (rightMatrix) {
      const leftMatrixData = this.data
      const result = multiplication(leftMatrixData, rightMatrix)

      const rightNumRows = numCols
      const rightNumCols = result.length / rightNumRows

      const Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

      return new Matrix(result)
    }

    // Static operators.

    Matrix.multiplication = multiplication
    Matrix.transpose = transpose

    // Aliases

    operators.filter(matrixOperators).forEach(operator => {
      const isInstanceMethod = operator.isInstanceMethod
      const isStaticMethod = operator.isStaticMethod
      const operatorName = operator.name

      operator.aliases.forEach(alias => {
        if (isInstanceMethod) {
          Matrix.prototype[alias] = Matrix.prototype[operatorName]
        }

        if (isStaticMethod) {
          Matrix[alias] = Matrix[operatorName]
        }
      })
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
