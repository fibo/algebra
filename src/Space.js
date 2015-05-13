
var inherits = require('inherits')

var arrayFrom = require('./arrayFrom'),
    Element   = require('./Element'),
    toData    = require('./toData')

function getResult (dimension, operator, dataArg) {
  var result = dataArg[0]

  for (var i=1; i < dataArg.length; i++) {
    var data = dataArg[i]

    for (var j=0; j < dimension; j++) {
      result[j] = operator(result[j], data[j])
    }
  }

  return result
}

/**
 * Abstract multidimensional space
 *
 * @param {Object} Scalar
 * @param {Array} indices
 *
 * @constructor
 */

function Space (Scalar) {

  // TODO function Dimension (indices, coindices)
  function Dimension (indices) {

    // Attribute dimension is the product of all indices.
    var dimension = indices.reduce(function (a, b) { return a * b }, 1)

    /*
     *
     */

    function spaceAddition () {
      return getResult(dimension, Scalar.addition, arrayFrom(arguments).map(toData))
    }

    /*
     *
     */

    function spaceSubtraction () {
      return getResult(dimension, Scalar.subtraction, arrayFrom(arguments).map(toData))
    }

    /*
     *
     */

    function spaceScalarMultiplication (data, scalar) {
      var result = []

      // Check if scalar is ok.
      var aScalar = [scalar]
      var scalarOk = aScalar.map(Scalar.contains).map(toData)[0]

      for (var i=0; i<dimension; i++) {
        var x = Scalar.multiplication(data[i], scalarOk)
        result.push(x)
      }

      return result
    }

    /*
     *
     */

    function spaceScalarProduct () {
      var dataMul = getResult(dimension, Scalar.multiplication, arrayFrom(arguments).map(toData))

      var result = dataMul[0]

      for (var i=1; i<dimension; i++) {
        result = Scalar.addition(result, dataMul[i])
      }

      return result
    }

    /*
     * @param {Array} data
     *
     * @returns {Boolean}
     */

    function contains (data) {
      return data.map(Scalar.contains).length === dimension
    }

      // TODO spaceIdentity

    /**
     * Tensor
     *
     * @param {Array} data
     *
     * @constructor
     */

    function Tensor (data) {
      Element.call(this, data, contains)

      Object.defineProperty(this, 'indices', {
        enumerable : true,
        value      : indices,
        writable   : false
      })
    }

    inherits(Tensor, Element)

    /**
     *
     * @param {Array} data1
     * @param {Array} data2
     * ...
     * @param {Array} dataN
     *
     * @returns this Tensor with updated data
     */

    function tensorAddition () {
      this.data = spaceAddition(this.data, spaceAddition.apply(null, arguments))

      return this
    }

    Tensor.prototype.addition = tensorAddition
    Tensor.prototype.add      = tensorAddition

    /**
     *
     * @param {Array} data1
     * @param {Array} data2
     * ...
     * @param {Array} dataN
     *
     * @return this Tensor with updated data
     */

    function tensorSubtraction () {
      this.data = spaceSubtraction(this.data, spaceSubtraction.apply(null, arguments))

      return this
    }

    Tensor.prototype.subtraction = tensorSubtraction
    Tensor.prototype.sub         = tensorSubtraction

    /**
     *
     * @param {Any} scalar
     *
     * @return this Tensor with updated data
     */

    function tensorScalarMultiplication (scalar) {
      this.data = spaceScalarMultiplication(this.data, scalar)

      return this
    }

    Tensor.prototype.scalarMultiplication = tensorScalarMultiplication
    Tensor.prototype.scalar               = tensorScalarMultiplication

    // Static attributes.
    Tensor.dimension = dimension
    Tensor.indices   = indices
    Tensor.Scalar    = Scalar

    // Static operators.
    Tensor.addition             = spaceAddition
    Tensor.add                  = spaceAddition

    Tensor.subtraction          = spaceSubtraction
    Tensor.sub                  = spaceSubtraction

    Tensor.scalarMultiplication = spaceScalarMultiplication
    Tensor.scalar               = spaceScalarMultiplication

    return Tensor
  }

  // Static attribute.
  Dimension.Scalar = Scalar

  return Dimension
}

module.exports = Space

