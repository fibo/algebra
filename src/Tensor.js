var nAry = require('./nAry')

class Tensor {
  constructor (indices, type, ring, data) {
    this.indices = indices
    this.type = type
    this.ring = ring

    if (ring.contains(data)) {
      this.data = data
    } else {
      throw new TypeError('Invalid data: ' + data)
    }
  }

  addition () {
    var indices = this.indices
    var ring = this.ring

    return nAry(indices, ring.equality).apply(null, arguments)
  }
}

module.exports = Tensor
