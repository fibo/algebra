var inherits = require('inherits')
var no = require('not-defined')
var operators = require('./operators.json')
var staticProps = require('static-props')
var TensorSpace = require('./TensorSpace')

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

  /**
   * @api private
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

    function Matrix (data) {
      AbstractMatrix.call(this, data)

      staticProps(this, {
        numCols: numCols,
        numRows: numRows
      })
    }

    inherits(Matrix, AbstractMatrix)

    operators.group.forEach((operator) => {
      Matrix[operator] = AbstractMatrix[operator]
    })

    staticProps(Matrix, {
      isSquare: isSquare,
      numCols: numCols,
      numRows: numRows
    })

    return Matrix
  }
}

module.exports = MatrixSpace
