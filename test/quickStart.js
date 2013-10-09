
var algebra = require('../index')

describe("README's Quick start section", function () {
  it('has a working Complex numbers example', function () {
    var Complex = algebra.ComplexElement

    var z1 = new Complex(1, 2)
    var z2 = new Complex(3, 4)

    z1.mul(z2)

    z1.data.should.eql([-5, 10])

    // Many chainable operators are available.
    //z1.conjugation().mul([2, 0]);

/*
    z1.data.should.eql([-10, -20])
*/
  })

  it('has a working Vectors example', function () {
    var Rn = algebra.RealVectorSpace
    var R2 = new Rn(2)

  /*
    var v1 = new R2.Vector(1, 1)
    var v2 = new R2.Vector(2, 4)

    v1.add(v2)

    v1.data.should.eql([3, 5])
  */
  })

  it('has a working Matrices example', function () {
  /*
    var GLnR = algebra.RealGeneralLinearGroup
    var GL2R = new GLnR(2)

    var m1 = new GL2R.Matrix(1, 2, 
                             3, 4)

    var m2 = new GL2R.Matrix(-1, 0, 
                              0, 1)

    m1.mul(m2)

    m1.data.should.eql([1, 2, 3, 4])

    m1.determinant.data.should.eql(2)
  */
  })
})

