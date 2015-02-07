
var inherits = require('inherits')

var arrayFrom       = require('./arrayFrom'),
    AbstractElement = require('./Element'),
    toData          = require('./toData')

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

      // Check scalar is ok.
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
     *
     */

    function contains (data) {
      return data.map(Scalar.contains).length === dimension
    }

      // TODO spaceIdentity

    /**
      * Space Element
     *
     * @param {Array} data
     *
     * @constructor
     */

    function Element (data) {
      AbstractElement.call(this, data, contains)
    }

    inherits(Element, AbstractElement)

    /**
     *
     * @param {Array} data1
     * @param {Array} data2
     * ...
     * @param {Array} dataN
     *
     * @return this Element with updated data
     */

    function elementAddition () {
      this.data = spaceAddition(this.data, spaceAddition.apply(null, arguments))

      return this
    }

    Element.prototype.addition = elementAddition
    Element.prototype.add      = elementAddition

    /**
     *
     * @param {Array} data1
     * @param {Array} data2
     * ...
     * @param {Array} dataN
     *
     * @return this Element with updated data
     */

    function elementSubtraction () {
      this.data = spaceSubtraction(this.data, spaceSubtraction.apply(null, arguments))

      return this
    }

    Element.prototype.subtraction = elementSubtraction
    Element.prototype.sub         = elementSubtraction

    /**
     *
     * @param {Any} scalar
     *
     * @return this Element with updated data
     */

    function elementScalarMultiplication (scalar) {
      this.data = spaceScalarMultiplication(this.data, scalar)

      return this
    }

    Element.prototype.scalarMultiplication = elementScalarMultiplication
    Element.prototype.scalar               = elementScalarMultiplication

    // Static attributes.
    Element.dimension = dimension
    Element.indices   = indices
    Element.Scalar    = Scalar

    // Static functions.
    Element.addition = spaceAddition
    Element.add      = spaceAddition

    Element.subtraction = spaceSubtraction
    Element.sub         = spaceSubtraction

    return Element
  }

  // Static attribute.
  Dimension.Scalar = Scalar

  return Dimension
}

module.exports = Space

