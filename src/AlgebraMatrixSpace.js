
var AlgebraVectorSpace  = require('./AlgebraVectorSpace')
  , AlgebraMatrix       = require('./AlgebraMatrix')
  , AlgebraSquareMatrix = require('./AlgebraSquareMatrix')
  , inherits            = require('inherits')

/**
 * Space of matrices
 *
 * @param {Object} field
 * @param {Number} numberOfRows
 * @param {Number} numberOfColumns
 */

function AlgebraMatrixSpace (field, numberOfRows, numberOfColumns) {
  this.numberOfRows = numberOfRows
  this.numberOfColumns = numberOfColumns

  AlgebraVectorSpace.call(this, field, numberOfRows * numberOfColumns)

  // TODO what about inherited Vector constructor?
  // SOLUTION do not inherit from VectorSpace

  var space = this

  /**
   * Matrix constructor
   *
   * ```
   * var matrix = new space.Matrix(elements);
   * ```
   *
   */

  function Matrix (elements) {
    AlgebraMatrix.call(this, space, elements)
  }

  inherits(Matrix, AlgebraMatrix)
}

inherits(AlgebraMatrixSpace, AlgebraVectorSpace)

module.exports = AlgebraMatrixSpace

