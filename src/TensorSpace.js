
function coerceToData (arg) {
  if (typeof arg.data === "undefined")
    return arg
  else
    return arg.data
}

/**
 *
 * @param {Array} data1
 * @param {Array} data2
 *
 * @return {Array} data3
 */

function addition (data1, data2) {
  var data3 = []
  var Scalar = this.Scalar

  data1 = coerceToData(data1)
  data2 = coerceToData(data2)

  data1.forEach(function (element1, index) {
    var element2 = data2[index]

    var element3 = Scalar.addition(element1, element2)

    data3.push(element3)
  })

  return data3
}

/**
 *
 * @param {Object} Scalar
 * @param {Array} indices
 */

function TensorSpace (Scalar, indices) {
  var self = this

  this.Scalar = Scalar

  this.indices = indices

  var dimension = 1

  for (var i in indices)
    dimension *= indices[i]

  this.dimension = dimension

  function Tensor (elements) {
    var space = self
    var data = []

    for (var i = 0; i < space.dimension; i++) {
      var element = elements[i]

      data.push(Scalar.coerceToData(element))
    }

    this.space = space
    this.data = data
  }

  Tensor.prototype.addition = function (tensor2) {
    this.data = self.addition(this.data, tensor2)

    return this
  }

  self.Tensor = Tensor
}

TensorSpace.prototype.addition = addition

module.exports = TensorSpace

