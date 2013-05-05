
var coerce      = require('../util/coerce.js')
  , RealElement = require('./Element.js')
  , RealField   = require('./Field.js')
  , RealVector  = require('./Vector.js')
  , VectorSpace = require('../VectorSpace.js')
  , util        = require('util')

var R = new RealField()

function RealVectorSpace (dim) {
  var self = this

  VectorSpace.call(self, {
    dim   : dim,
    field : R
  })

  function Vector () {
    var self     = this
      , elements = coerce.argumentsToArray.apply(arguments)

console.log(elements)
    RealVector.call(self, elements)
  }
  self.Vector = Vector
}

util.inherits(RealVectorSpace, VectorSpace)

module.exports = RealVectorSpace

