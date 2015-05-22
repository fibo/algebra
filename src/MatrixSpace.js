
var inherits = require('inherits')

var determinant               = require('./determinant'),
    getIndices                = require('./getIndices'),
    matrixToArrayIndex        = require('./matrixToArrayIndex'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData'),
    VectorSpace               = require('./VectorSpace')

/**
 * Space of m x n matrices
 *
 * @class
 *
 * @param {Object} Scalar
 * @param {Number} numRows
 * @param {Number} numCols
 */

function MatrixSpace (Scalar) {
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
        Object.defineProperty(this, 'det', {get: matrixDeterminant})
      }
    }

    inherits(Matrix, Element)

    // Static attributes.
    Matrix.isSquare = isSquare
    Matrix.numRows  = numRows
    Matrix.numCols  = numCols

    // Static operators.
    Matrix.addition    = Element.addition
    Matrix.add         = Element.addition
    Matrix.subtraction = Element.subtraction
    Matrix.sub         = Element.subtraction

    /*!
     *
     */

    function matrixAddition (matrix) {
      this.data = Element.addition(this.data, matrix)

      return this
    }

    Matrix.prototype.addition = matrixAddition
    Matrix.prototype.add      = matrixAddition

    /*!
     *
     */

    function matrixSubtraction (matrix) {
      this.data = Element.subtraction(this.data, matrix)

      return this
    }

    Matrix.prototype.subtraction = matrixSubtraction
    Matrix.prototype.sub         = matrixSubtraction

    /*!
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

      // Left multiplication by a square matrix is an internal operation,
      // so the method is a mutator.
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

    /*!
     *
     */

    function leftMultiplication (leftMatrix) {
      var leftData    = toData(left),
          leftIndices = getIndices(left)

      var leftIsMatrix = leftIndices.length === 2,
          leftIsVector = leftIndices.length === 1

      var leftIsSquare = leftIsMatrix && (leftIndices[0] === leftIndices[1])

      if (leftIsVector)
        leftIndices.push(1)

      var data = rowByColumnMultiplication(Scalar, leftData, leftIndices, this.data, this.indices)

      // Left multiplication by a square matrix is an inner product,
      // so the method is a mutator.
      if (leftIsSquare) {
        this.data = data

        return this
      }

      if (leftIsVector) {
        var Vector = VectorSpace(Scalar)(numCols)

        return new Vector(data)
      }
    }

    Matrix.prototype.leftMultiplication = leftMultiplication
    Matrix.prototype.leftMul            = leftMultiplication

    /*!
     * @todo should be extended to a Tensor operator, also vectors can be transposed
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

  return Dimension
}

module.exports = MatrixSpace

