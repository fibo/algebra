var staticAttribute = require('./staticAttribute')

class Tensor {
  constructor (space, data) {
    var staticAttr = staticAttribute.bind(this)

    staticAttr('indices', space.getIndices)
  }
}
