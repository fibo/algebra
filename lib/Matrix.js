
var Tensor = require('./Tensor.js')
  , util = require('util')

function Matrix () {
  var self = this
    , arg = arguments[0] || {}

  Tensor.call(self, arg)
}

util.inherits(Matrix, Tensor)

module.exports = Matrix

