
var AlgebraVector = require('./AlgebraVector')
  , AlgebraField  = require('./AlgebraField')
  , inherits      = require('inherits')
  , _             = require('underscore')

/**
 * Vector Space over a field
 *
 * @param {Object} field
 * @param {dimension} number
 */

function AlgebraVectorSpace (field, dimension) {
  var self = this

  this.field = field

  this.dimension = dimension

  /**
   * AlgebraVector constructor
   *
   * ```
   * var vector = new space.Vector();
   * ```
   *
   * @return {Object} vector
   */

  function Vector () {
    var arg0 = arguments[0]
      , numArgs = arguments.length
      , elements = []

    if ((numArgs === 1) && (_.isArray(arg0)))
      elements = arg0

    if (numArgs > 1)
      for (var i in arguments)
        elements.push(arguments[i])

    AlgebraVector.call(this, self, elements)
  }

  inherits(Vector, AlgebraVector)

  this.Vector = Vector
}

/**
 * Add vector element data
 */

function addition (vector1, vector2) {
  var data = []
    , field = this.field
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

