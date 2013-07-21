
var AlgebraTensor = require('./AlgebraTensor')
  , util          = require('util')

function AlgebraVector() {
  AlgebraTensor.call(this, arguments, arguments.length)
}

util.inherits(AlgebraVector, AlgebraTensor)

module.exports = AlgebraVector

