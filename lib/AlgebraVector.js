
var AlgebraTensor = require('./AlgebraTensor')
  , util          = require('util')

function AlgebraVector(field, elements) {
  if (typeof elements === 'undefined')
    elements = [real.zero]

  AlgebraTensor.call(this, field, [elements.length], elements)
}

util.inherits(AlgebraVector, AlgebraTensor)

module.exports = AlgebraVector

