
var RealField       = require('./RealField')
  , ComplexField    = require('./ComplexField')
  , QuaternionField = require('./QuaternionField')
  
var R = new RealField()
  , C = new ComplexField()
  , H = new QuaternionField()

var RealElement       = require('./RealElement')
  , ComplexElement    = require('./ComplexElement')
  , QuaternionElement = require('./QuaternionElement')

//R.Element = RealElement
//C.Element = ComplexElement
//H.Element = QuaterionElement

exports.R = R
exports.C = C
exports.H = H

var RealVectorSpace = require('./RealVectorSpace')

exports.R2 = new RealVectorSpace(2)
exports.R3 = new RealVectorSpace(3)
exports.R4 = new RealVectorSpace(4)

var RealMatrixSpace = require('./RealMatrixSpace')

var R2x2 = new RealMatrixSpace(R, 2, 2)

