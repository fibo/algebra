
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
  })
})