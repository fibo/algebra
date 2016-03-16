
var algebra = require('algebra'),
    should  = require('should')

describe('Synopsis', function () {
  it('works'/*, function () {
    var R = algebra.Real

    R.add(1, 2, 3).should.eql(6)

    var x = new R(2),
        y = new R(-2)

    var r = x.mul(y)
    r.data.should.eql(-4)
    x.data.should.eql(2)

    x = x.add(3).mul(2).inv()

    x.data.should.eql(0.1)

    x.equal(0.1).should.be.ok
    x.notEqual(Math.PI).should.be.ok

    var R2 = algebra.VectorSpace(R)(2)

    var v1 = new R2([0, 1])
    var v2 = new R2([1, -2])

    v1 = v1.add(v2)

    v1.data.should.eql([1, -1])

    var R3x2 = algebra.MatrixSpace(R)(3, 2)

    var m1 = new R3x2([1, 1,
                       0, 1,
                       1, 0])

    var v3 = m1.mul(v1)

    should.deepEqual(v3.data, [0, -1, 1])

    var R2x2 = algebra.MatrixSpace(R)(2)

    var m2 = new R2x2([1, 0,
                       0, 2]),
        m3 = new R2x2([0, -1,
                       1, 0])

    m2 = m2.mul(m3)

    should.deepEqual(m2.data, [0, -1, 2,  0])

    m2.determinant.data.should.be.eql(2)
  }*/)
})
