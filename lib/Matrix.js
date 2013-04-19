
var Tensor = require('./Tensor.js')
  , util = require('util')

function Matrix () {
  var self = this

  Tensor.apply(self, arguments)
}

util.inherits(Matrix, Tensor)

module.exports = Matrix

