
var AlgebraMatrix       = require('./AlgebraMatrix')
  , AlgebraSquareMatrix = require('./AlgebraSquareMatrix')
  , inherits            = require('inherits')

/**
 * Space of matrices
 *
 * @param {Object} Element constructor
 * @param {Number} numberOfRows
 * @param {Number} numberOfColumns
 */

function AlgebraMatrixSpace (Element, numberOfRows, numberOfColumns) {
  var self = this

  this.numberOfRows = numberOfRows
  this.numberOfColumns = numberOfColumns

  function getDimension () {
    return numberOfRows * numberOfColumns
  }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  this.Element = Element
  // TODO AlgebraTensorSpace.call(this, Element, numberOfRows * numberOfColumns)

  /**
   * Matrix constructor
   *
   * @return {Object} matrix
   */

  function Matrix (elements) {
    var arg0 = arguments[0]
      , numArgs = Math.max(arguments.length, self.dimension)
      , elements = []

    if ((numArgs === 1) && (_.isArray(arg0)))
      elements = arg0

    if (numArgs > 1)
      for (var i in arguments) {
        var arg = arguments[i]
          , element

        if (arg instanceof Element)
          element = arg
        else
          element = new Element(arg)

        elements.push(element)
      }

    AlgebraMatrix.call(this, self, elements)
  }

  inherits(Matrix, AlgebraMatrix)
}

// TODO inherits(AlgebraMatrixSpace, AlgebraTensorSpace)

/**
 * Add matrix element data
 *
 * @return {Array} data
 */

function addition (matrix1, matrix2) {
  var data = []
    , field = this.Element.field
    , element1
    , element2

  matrix1.elements.forEach(function (element, i) {
    element1 = matrix1.elements[i]
    element2 = matrix2.elements[i]

    data.push(field.addition(element1, element2))
  })

  return data
}

AlgebraMatrixSpace.prototype.addition = addition

module.exports = AlgebraMatrixSpace

