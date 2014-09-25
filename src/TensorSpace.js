
/**
 *
 * @param {Array} tensor1
 * @param {Array} tensor2
 *
 * @return {Array} tensor3
 */

function addition (tensor1, tensor2) {
  var tensor3 = []
  var Field = this.Field

  tensor1.forEach(function (element1, index) {
    var element2 = tensor2[index]

    var element3 = Field.addition(element1, element2)

    tensor3.push(element3)
  })

  return tensor3
}

/**
 *
 * @param {Object} Field
 * @param {Array} indices
 */

function TensorSpace (Field, indices) {
  var self = this

  this.Field = Field

  var dimension = 1 

  for (var i in indices)
    dimension *= index[i]

  this.dimension = dimension
}

TensorSpace.prototype.addition = addition

module.exports = TensorSpace

