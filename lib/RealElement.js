
var AlgebraElement = require('./AlgebraElement')
  , RealField      = require('./RealField')
  , util           = require('util')

var Real = new RealField()

function RealElement(num) {
  AlgebraElement.call(this, num, Real)
}

util.inherits(RealElement, AlgebraElement)

module.exports = RealElement

