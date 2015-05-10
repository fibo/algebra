
var inherits = require('inherits')

var determinant               = require('./determinant'),
    getIndices                = require('./getIndices'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData'),
    VectorSpace               = require('./VectorSpace')

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

      /*
       *
       */

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

    function spaceMultiplication (left, right) {
      var leftData     = toData(left),
          leftIndices  = getIndices(left),
          rightData    = toData(right),
          rightIndices = getIndices(right)

      // TODO var rank = Math.max(leftIndices.length, rightIndices.length)
      var rank = 2

      // Fill indices to have the same signature
      for (var i = 0; i < rank - rightIndices.length; i++)
        rightIndices.push(1)

      return rowByColumnMultiplication(Scalar, leftData, leftIndices, rightData, rightIndices)
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

    function rightMultiplication (right) {
      var rightData    = toData(right),
          rightIndices = getIndices(right)

      var rightIsMatrix = rightIndices.length === 2,
          rightIsVector = rightIndices.length === 1

      // TODO rightIsScalar and use scalarMultiplication

      var rightIsSquare = rightIsMatrix && (rightIndices[0] === rightIndices[1])

      if (rightIsVector)
        rightIndices.push(1)

      var data = rowByColumnMultiplication(Scalar, this.data, this.indices, rightData, rightIndices)

      // Right multiply by a square matris is an inner product, so the method
      // is a mutator and can be chained.
      if (rightIsSquare) {
        this.data = data

        return this
      }

      if (rightIsVector) {
        var Vector = VectorSpace(Scalar)(numRows)

        return new Vector(data)
      }
        // TODO if rightIsMatrix return new this(Scalar)(numRows, numCols)(data)
    }

    Matrix.prototype.rightMultiplication = rightMultiplication
    Matrix.prototype.rightMul            = rightMultiplication
    Matrix.prototype.multiplication      = rightMultiplication
    Matrix.prototype.mul                 = rightMultiplication

    /*
     *
     */

    function leftMultiplication (leftMatrix) {
      this.data = spaceMultiplication(leftMatrix, this)

      return this
    }

    Matrix.prototype.leftMultiplication = leftMultiplication
    Matrix.prototype.leftMul            = leftMultiplication

    return Matrix
  }

  return Dimension
}

module.exports = MatrixSpace

