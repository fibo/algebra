
var inherits = require('inherits')

var Space = require('./Space')

/**
 * Space of vectors
 *
 * ```
 * var V = VectorSpace(R)(2)
 *
 * var v = new V([1, 2])
 * ```
 *
 * @param {Object} Scalar
 *
 * @return {Function} Dimension
 */

function VectorSpace (Scalar) {

  /**
   * Dimension
   *
   * @param {Number} dimension
   *
   * @return {Constructor} Vector
   */

  function Dimension (dimension) {
    var Element = Space(Scalar)([dimension])

    function Vector () {
      Element.apply(this, arguments)

      var data = this.data

      /*
       * Norm of a vector
       *
       * Given v = (x1, x2, ... xN)
       *
       * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
       *
       * @return {Scalar} result
       */

      function vectorNorm () {
        var result = Scalar.multiplication(data[0], data[0])

        for (var i=1; i<dimension; i++) {
          result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))
        }

        return new Scalar(result)
      }

      Object.defineProperty(this, 'norm', {get: vectorNorm})
    }

    inherits(Vector, Element)

    // TODO da mettere in metodo tipo addStaticOperators
    Vector.addition    = Element.addition
    Vector.add         = Element.addition
    Vector.subtraction = Element.subtraction
    Vector.sub         = Element.subtraction

    return Vector
  }

  return Dimension
}

module.exports = VectorSpace

