
var determinant               = require('laplace-determinant'),
    getIndices                = require('./getIndices'),
    inherits                  = require('inherits'),
    isInteger                 = require('is-integer'),
    matrixToArrayIndex        = require('./matrixToArrayIndex'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication'),
    toData                    = require('./toData'),
    VectorSpace               = require('./VectorSpace')

/**
 * Space of m x n matrices
 *
 * @function
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace (Scalar) {

  /**
   *
   * @param {Number} numRows
   * @param {Number} numCols which is optional: defaults to a square matrix.
   *
   * @returns {Constructor} Matrix
   */

  return function (numRows, numCols) {

    // numCols defaults to numRows
    if (typeof numCols === 'undefined')
      numCols = numRows

    var dimension = numRows * numCols,
        indices   = [numRows, numCols],
        isSquare  = (numRows === numCols)

    // MatrixSpace mxn is a VectorSpace with dim=m*n

    var Vector = VectorSpace(Scalar)(dimension)

      /*
       *
       */

    function Matrix (data) {
      Vector.call(this, data)

      /*
       *
       */

      function matrixDeterminant () {
        var det = determinant(this.data, Scalar, numRows)

        return new Scalar(det)
      }

      if (isSquare) {
        Object.defineProperty(this, 'determinant', {get: matrixDeterminant})
        Object.defineProperty(this, 'det', {get: matrixDeterminant})
      }
    }

    inherits(Matrix, Vector)

    // Static operators and attributes.

    Matrix.isSquare = isSquare
    Matrix.numRows  = numRows
    Matrix.numCols  = numCols

    Matrix.addition    = Vector.addition
    Matrix.subtraction = Vector.subtraction
    Matrix.negation    = Vector.negation

    Object.defineProperty(Matrix, 'zero', {
      writable: false,
      value: Vector.zero
    })


    /**
     * Row by column multiplication at right side
     */

    function multiplication (right) {
      // Multiplication is possible only if
      //
      //     left num cols = right num rows
      //
      // Since
      //
      //     right num rows * right num cols = rightData.length
      //
      // it is possible to compute right num cols and the right matrix is square if
      //
      //     right num rows = right num cols
      //
      // which is the same as rightNumCols = (left)numCols

      // leftNumRows, leftNumCols = rightNumRows, rightNumCols

      var rightData    = toData(right),
          rightNumCols = rightData.length / numCols

      // Check if rightNumCols results to be an integer.
      if (isInteger(rightNumCols))
        throw new TypeError('left num cols != right num rows')

      var rightIsSquare = (rightNumCols === numCols),
          rightIsVector = (rightNumCols === 1)

      var data = rowByColumnMultiplication(Scalar, this.data, numRows, rightData, rightNumCols)

      if (rightIsVector) {
        var Vector = VectorSpace(Scalar)(numRows)

        return new Vector(data)
      }

      if (rightIsSquare) {
        // Right multiplication by a square matrix is an internal operation,
        // so the method behaves like a mutator.

        this.data = data

        return this
      }
      else {
        // In this case, right element should be a matrix, but not square,
        // so the methos returns a new element.
        return new MatrixSpace(Scalar)(numRows, rightNumCols)(data)
      }

    }

    Matrix.prototype.multiplication = multiplication
    Matrix.prototype.mul            = multiplication

    /**
     *
     * @param {numRows}
     * @param {numCols}
     * @param {Object|Array} matrix
     *
     * @returns {Array} transposedData
     */

    function transpose (numRows, numCols, matrix) {
      var data = toData(matrix),
          transposedData = []

      for (var i = 0; i < numRows; i++)
        for (var j = 0; j < numCols; j++)
          transposedData.push(data[matrixToArrayIndex(j, i, numCols)])

      return transposedData
    }

    var staticTranspose = transpose.bind(null, numRows, numCols)
    Matrix.transpose = staticTranspose
    Matrix.tr            = staticTranspose

    /*!
     *
     * @returns {Object} transposedMatrix
     */

    function matrixTransposition () {
      var data    = this.data,
          numCols = this.numCols,
          numRows = this.numRows

      var transposedData     = transpose(numCols, numRows, data),
          transposedIndices  = [numCols, numRows]

      var TransposedMatrix = Space(Scalar)(transposedIndices)

      var transposedMatrix = new TransposedMatrix(transposedData)

      return transposedMatrix
    }

    Matrix.prototype.transpose = matrixTransposition
    Matrix.prototype.tr        = matrixTransposition
    Matrix.prototype.t         = matrixTransposition

    return Matrix
  }
}

module.exports = MatrixSpace

