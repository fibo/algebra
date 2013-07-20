
var AlgebraElement = require('./AlgebraElement')
  , RealField      = require('./RealField')

var Real = new RealField()

function RealElement(num) {
  AlgebraElement.call(this, num, Real)
}

module.exports = RealElement

