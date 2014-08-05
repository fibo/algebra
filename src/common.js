

var RealField       = require('./RealField')
  , ComplexField    = require('./ComplexField')
  , QuaternionField = require('./QuaternionField')
  
var R = new RealField()
  , C = new ComplexField()
  , H = new QuaternionField()

exports.R = R
exports.C = C
exports.H = H

var RealMatrixSpace = require('./RealMatrixSpace')

var R2x2 = new RealMatrixSpace(R, 2, 2)

