
var algebra = require('algebra'),
    should  = require('should')

describe('Synopsis', function () {
  it('works', function () {
    var R = algebra.Real

    R.add(1, 2, 3).should.eql(6)

    var x = new R(2),
        y = new R(-2)

    x.mul(y)
    x.data.should.eql(-4)

    x.add(6).mul(2).inv()

    x.data.should.eql(0.25)

    var R2 = algebra.VectorSpace(R)(2)

    var v1 = new R2([0, 1])
    var v2 = new R2([1, -2])

    v1.add(v2)

    v1.data.should.eql([1,
                       -1])

    var R3x2 = algebra.MatrixSpace(R)(3, 2)

    var m1 = new R3x2([1, 1,
                       0, 1,
                       1, 0])

    var v2 = m1.mul(v1)

    console.log(v2.data)
    //v2.data.should.deepEqual([0, -1, 1])
  })
})
