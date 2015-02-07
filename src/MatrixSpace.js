
var inherits = require('inherits')

var determinant               = require('./determinant'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData')

/**
 * Space of m x n matrices
 *
 * @param {Object} Scalar
 * @param {Number} numRows
 * @param {Number} numCols
 */

function MatrixSpace (Scalar) {
  var self = this

  /**
   * Dimension
   *
   * @param {Number} numRows
   * @param {Number} numCols which is optional: defaults to a square matrix.
   *
   * @return {Constructor} Matrix
   */

  function Dimension (numRows, numCols) {
    var isSquare = false

    if (typeof numCols === 'undefined') {
      // numCols defaults to numRows
      numCols = numRows

      isSquare = true
    }

    var indices = [numRows, numCols]

    var Element = Space(Scalar)(indices)

    function Matrix () {
      Element.apply(this, arguments)

      /*
       *
       */

      function matrixDeterminant () {
        var det = determinant(Scalar, this.data, numRows)

        return new Scalar(det)
      }

      if (isSquare) {
        Object.defineProperty(this, 'determinant', {get: matrixDeterminant})
        Object.defineProperty(this, 'det',         {get: matrixDeterminant})
      }
    }

    inherits(Matrix, Element)

    // Static attributes.
    Matrix.isSquare = isSquare
    Matrix.numRows  = numRows
    Matrix.numCols  = numCols

    /*
     *
     */

    function spaceMultiplication (leftMatrix, rightMatrix) {
      var left  = toData(leftMatrix),
          right = toData(rightMatrix)

      return rowByColumnMultiplication(Scalar, left, indices, right, indices)
    }

    /*
     *

     */
    function matrixAddition (matrix) {
      this.data = space.addition(this.data, matrix)

      return this
    }

    Matrix.prototype.addition = matrixAddition
    Matrix.prototype.add      = matrixAddition

    /*
     *

     */
    function matrixSubtraction (matrix) {
      this.data = space.subtraction(this.data, matrix)

      return this
    }

    Matrix.prototype.subtraction = matrixSubtraction
    Matrix.prototype.sub         = matrixSubtraction

    /*
     *
     */

    function rightMultiplication (rightMatrix) {
      this.data = spaceMultiplication(this.data, rightMatrix)

      return this
    }

    Matrix.prototype.rightMultiplication = rightMultiplication
    Matrix.prototype.rightMul            = rightMultiplication
    Matrix.prototype.multiplication      = rightMultiplication
    Matrix.prototype.mul                 = rightMultiplication

    /*
     *
     */

    function leftMultiplication (leftMatrix) {
      this.data = spaceMultiplication(leftMatrix, this.data)

      return this
    }

    Matrix.prototype.leftMultiplication = leftMultiplication
    Matrix.prototype.leftMul            = leftMultiplication

    return Matrix
  }

  return Dimension
}

module.exports = MatrixSpace
