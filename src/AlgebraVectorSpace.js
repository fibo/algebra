
var AlgebraVector = require('./AlgebraVector')
  , inherits      = require('inherits')
  , _             = require('underscore')

/**
 * Vector Space over a field
 *
 * @param {Object} Element constructor
 * @param {dimension} number
 */

function AlgebraVectorSpace (Element, dimension) {
  var self = this

  this.Element = Element

  this.dimension = dimension

  /**
   * AlgebraVector constructor
   *
   * @return {Object} vector
   */

  function Vector () {
    var arg0 = arguments[0]
      , numArgs = Math.max(arguments.length, dimension)
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

    AlgebraVector.call(this, self, elements)
  }

  inherits(Vector, AlgebraVector)

  this.Vector = Vector
}

/**
 * Add vector element data
 *
 * @return {Array} data
 */

function addition (vector1, vector2) {
  var data = []
    , field = this.Element.field
    , element1
    , element2

  vector1.elements.forEach(function (element, i) {
    element1 = vector1.elements[i]
    element2 = vector2.elements[i]

    data.push(field.addition(element1, element2))
  })

  return data
}

AlgebraVectorSpace.prototype.addition = addition

module.exports = AlgebraVectorSpace

