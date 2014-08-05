
var AlgebraInvertibleMatrix = require('./AlgebraInvertibleMatrix')
  , inherits                = require('inherits')

/**
 * Group of invertible matrices
 */

function GeneralLinearGroup (Element, degree) {

  function Matrix () {
    var arg0 = arguments[0]
      , numArgs = arguments.length
      , elements = []

    if ((numArgs === 1) && (_.isArray(arg0)))
      elements = arg0

    if (numArgs > 1)
      for (var i in arguments)
        elements.push(arguments[i])

    AlgebraInvertibleMatrix.call(this, Element, degree, elements)
  }

  inherits(Matrix, AlgebraInvertibleMatrix)

  this.Matrix = Matrix
}

module.exports = GeneralLinearGroup

