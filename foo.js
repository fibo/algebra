var algebra = require('./')

var notDefined = require('not-defined')

var MatrixSpace = algebra.MatrixSpace
var Real = algebra.Real

  var R2x3 = MatrixSpace(Real)(2, 3)
  var R2x2 = MatrixSpace(Real)(2)
  var R3x2 = MatrixSpace(Real)(3, 2)

      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

console.log(R3x2.transpose(matrix3x2))
