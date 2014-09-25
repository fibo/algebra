
/**
 *
 * @param {Array} vector1
 * @param {Array} vector2
 *
 * @return {Array} vector
 */

function addition (vector1, vector2) {
  var vector3 = []

  vector1.forEach(function (element1, index) {
    var element2 = vector2[index]

    var element3 = Scalar.addition(element1, element2)

    vector3.push(element3)
  })

  return vector3
}

/**
 *
 */

function VectorSpace (Scalar, dimension) {
  this.Scalar = Scalar
  this.dimension = dimension
}

module.exports = VectorSpace

