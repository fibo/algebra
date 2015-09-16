
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

    function createIdentity (scalarZero, scalarOne, rank) {
      var identity = []

      for (var i = 0; i < rank; i++)
        for (var j = 0; j < rank; j++)
          if (i === j)
            identity.push(scalarOne)
          else
            identity.push(scalarZero)

     return identity
    }

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

      this.numCols = numCols
      this.numRows = numRows

      Object.defineProperties(this, {
        'numCols': { writable: false, value: numCols },
        'numRows': { writable: false, value: numRows }
      })

      /*
       *
       */

      function matrixDeterminant () {
        var det = determinant(this.data, Scalar, numRows)

        return new Scalar(det)
      }

      if (isSquare) {
        Object.defineProperty(this, 'determinant', {get: matrixDeterminant})
      }
    }

    inherits(Matrix, Vector)

    // Static attributes.

    if (isSquare) {
      // TODO rank should be calculated depending on determinant
      // if determinant is zero, rank < numRows, but this needs sub-matrix function
      // which is in laplace-determinant package and should be placed in its own package
      var rank = numRows

      var identity = createIdentity(Scalar.zero, Scalar.one, rank)

      Object.defineProperty(Matrix, 'identity', {
        writable: false,
        value: identity
      })
    }

    Object.defineProperties(Matrix, {
      'isSquare': { writable: false, value: isSquare },
      'numCols': { writable: false, value: numCols },
      'numRows': { writable: false, value: numRows },
      'zero': { writable: false, value: Vector.zero }
    })

    /**
     * Row by column multiplication at right side
     */

    function staticRightMultiplication (leftNumRows, leftNumCols, left, right) {
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

      // leftNumRows, leftNumCols = rightNumRows, rightNumCols

      var leftData  = toData(left),
          rightData = toData(right),
          rightNumCols = rightData.length / leftNumCols

      // Check if rightNumCols results to be an integer: it means matrices can be multiplied.
      if (! isInteger(rightNumCols))
        throw new TypeError('left num cols != right num rows')

      return rowByColumnMultiplication(Scalar, leftData, leftNumRows, rightData, rightNumCols)
    }

    function rightMultiplication (right) {
      var left        = this.data,
          leftNumCols = this.numCols,
          leftNumRows = this.numRows,
          rightData   = toData(right)

      var data = staticRightMultiplication(leftNumRows, leftNumCols, left, right)

      // If staticRightMultiplication does not throw it means that matrices can multiplied.
      var rightNumCols = rightData.length / leftNumCols,
          rightNumRows = leftNumCols

      var rightIsSquare = (rightNumCols === rightNumRows),
          rightIsVector = (rightNumCols === 1)

      if (rightIsVector) {
        console.log(rightNumRows, data)
        return new VectorSpace(Scalar)(rightNumRows)(data)
      }

      if (rightIsSquare) {
        // Right multiplication by a square matrix is an internal operation,
        // so the method behaves like a mutator.

        this.data = data

        return this
      }
      else {
        // In this case, right element should be a matrix, but not square,
        // so the method returns a new element.
        return new MatrixSpace(Scalar)(rightNumRows, rightNumCols)(data)
      }
    }

    Matrix.prototype.multiplication = rightMultiplication

    /**
     *
     * @param {numRows}
     * @param {numCols}
     * @param {Object|Array} matrix
     *
     * @returns {Array} transposedData
     */

    function transpose (numRows, numCols, matrix) {
      var data           = toData(matrix),
          transposedData = []

      for (var i = 0; i < numRows; i++)
        for (var j = 0; j < numCols; j++) {
          transposedData[matrixToArrayIndex(j, i, numRows)] = data[matrixToArrayIndex(i, j, numCols)]
        }

      return transposedData
    }

    /**
     *
     * @returns {Object} transposed matrix
     */

    function matrixTransposition () {
      var data    = this.data,
          numCols = this.numCols,
          numRows = this.numRows

      var transposedData = transpose(numRows, numCols, data)

                                              // +--------+-- Transposed indices here.
                                              // ↓        ↓
      var TransposedMatrix = MatrixSpace(Scalar)(numCols, numRows)
      return new TransposedMatrix(transposedData)
    }

    Matrix.prototype.transpose = matrixTransposition

    // Static operators.

    Matrix.addition       = Vector.addition
    Matrix.multiplication = staticRightMultiplication.bind(null, numRows, numCols)
    Matrix.negation       = Vector.negation
    Matrix.subtraction    = Vector.subtraction
    Matrix.transpose      = transpose.bind(null, numRows, numCols)

    // Aliases.

    Matrix.add = Matrix.addition
    Matrix.mul = Matrix.multiplication
    Matrix.neg = Matrix.negation
    Matrix.sub = Matrix.subtraction

    Matrix.prototype.mul = rightMultiplication
    Matrix.prototype.o   = rightMultiplication

    Matrix.prototype.tr = matrixTransposition
    Matrix.prototype.t  = matrixTransposition

    Matrix.tr = Matrix.transpose

    return Matrix
  }
}

module.exports = MatrixSpace

