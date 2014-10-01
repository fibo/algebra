
var inherits = require('inherits')

var Space = require('./Space')
  , rowByColumnMultiplication = require('./rowByColumnMultiplication.js')
  , toData = require('./toData')

/**
 * Space of m x n matrices
 *
 * @param {Object} field
 * @param {Number} numRows
 * @param {Number} numCols
 *
 * @constructor
 */

function MatrixSpace (field, numRows, numCols) {
  var self = this

  var isSquare = false

  if (typeof numCols === 'undefined') {
    // numCols defaults to numRows
    numCols = numRows

    isSquare = true
  }

  this.numRows = numRows
  this.numCols = numCols

  var indices = [numRows, numCols]

  var space = new Space(field, indices)

  function spaceMultiplication (leftMatrix, rightMatrix) {
    var left  = toData(leftMatrix)
      , right = toData(rightMatrix)

    return rowByColumnMultiplication(field, left, indices, right, indices)
  }

  self.addition = space.addition
  self.add      = space.add

  self.subtraction = space.subtraction
  self.sub         = space.sub

  if (isSquare) {
    self.multiplication = spaceMultiplication
    self.mul            = spaceMultiplication
  }

  function Matrix (data) {
    space.Element.call(this, data)
  }

  inherits(Matrix, space.Element)

  function matrixAddition (matrix) {
    this.data = space.addition(this.data, matrix)

    return this
  }

  Matrix.prototype.addition = matrixAddition
  Matrix.prototype.add      = matrixAddition

  function matrixSubtraction (matrix) {
    this.data = space.subtraction(this.data, matrix)

    return this
  }

  Matrix.prototype.subtraction = matrixSubtraction
  Matrix.prototype.sub         = matrixSubtraction

  function rightMultiplication (rightMatrix) {
    this.data = spaceMultiplication(this.data, rightMatrix)

    return this
  }

  Matrix.prototype.rightMultiplication = rightMultiplication
  Matrix.prototype.rightMul            = rightMultiplication
  Matrix.prototype.multiplication      = rightMultiplication
  Matrix.prototype.mul                 = rightMultiplication

  function leftMultiplication (leftMatrix) {
    this.data = spaceMultiplication(leftMatrix, this.data)

    return this
  }

  Matrix.prototype.leftMultiplication = leftMultiplication
  Matrix.prototype.leftMul            = leftMultiplication

  self.Matrix = Matrix
}

inherits(MatrixSpace, Space)

module.exports = MatrixSpace
