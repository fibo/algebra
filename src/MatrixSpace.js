var inherits = require('inherits')
var no = require('not-defined')
var operators = require('./operators.json')
var staticProps = require('static-props')
var TensorSpace = require('./TensorSpace')
var tensorContraction = require('tensor-contraction')
var tensorProduct = require('tensor-product')
var toData = require('./toData')

/**
 * Space of m x n matrices
 *
 * ```
 * var R = algebra.R
 *
 * var R2x2 = algebra.MatrixSpace(R)(2)
 * ```
 *
 * @param {Object} field
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace (field) {
  var contraction = tensorContraction.bind(null, field.addition)

  /**
   *
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {Function} Matrix
   */

  return function (numRows, numCols) {
    // numCols defaults to numRows
    if (no(numCols)) numCols = numRows

    var isSquare  = (numRows === numCols)

    var AbstractMatrix = TensorSpace([numRows, numCols])(field)

    var indices = [numRows, numCols]

    function trace (matrix) {
      var matrixData = toData(matrix)

      return contraction([0, 1], indices, matrixData)
    }

    /**
     * @class
     */

    function Matrix (data) {
      AbstractMatrix.call(this, data)

      staticProps(this)({
        numCols: numCols,
        numRows: numRows
      })

      if (isSquare) {
        staticProps(this)({
          trace: trace(data)
        })
      }
    }

    inherits(Matrix, AbstractMatrix)

    if (isSquare) {
      Matrix.trace = trace
    }

    operators.group.forEach((operator) => {
      Matrix[operator] = AbstractMatrix[operator]
    })

    staticProps(Matrix)({
      numCols: numCols,
      numRows: numRows
    })

    return Matrix
  }
}

module.exports = MatrixSpace
