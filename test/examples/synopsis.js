
var algebra = require('algebra'),
    should  = require('should')

describe('Synopsis', function () {
  it('works', function () {
    var R = algebra.Real

    R.add(1, 2, 3).should.eql(6)

    var x = new R(3),
        y = new R(-1)

    x.mul(y)
    x.data.should.eql(-3)

    x.add(5).mul(2).inv()

    x.data.should.eql(0.25)

    var R2 = algebra.VectorSpace(R)(2)

    var v1 = new R2([0, 1])
    var v2 = new R2([1, -4])
  })
})
