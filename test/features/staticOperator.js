
var should = require('should')

module.exports = function staticOperator (Scalar, operator, a, b, c) {
  return function () {
    Scalar[operator](a, b).should.eql(c)
  }
}

