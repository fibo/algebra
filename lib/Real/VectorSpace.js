
var RealElement = require('./Element.js')
  , RealField   = require('./Field.js')
  , RealVector  = require('./Vector.js')
  , VectorSpace = require('../VectorSpace.js')
  , util        = require('util')

var R = new RealField()

function RealVectorSpace (dim) {
  var self = this

  var arg = {}

  arg.dim = dim
  arg.field = R

  VectorSpace.call(self, arg)

  function Vector () {
    var arg = {}

    arg.elements = []
    arg.space = self

    for (var i = 0; i < self.getDim(); i++)
      arg.elements.push(arguments[i])
    
    RealVector.call(this, arg)
  }
  self.Vector = Vector
}

util.inherits(RealVectorSpace, VectorSpace)

module.exports = RealVectorSpace

