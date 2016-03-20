var CompositionAlgebra = require('../src/CompositionAlgebra')
var realField = require('../src/realField')

describe('CompositionAlgebra', () => {
  it('has signature (field)(num)', () => {
    var R = CompositionAlgebra(realField)(0)
    var C = CompositionAlgebra(realField)(1)
    var H = CompositionAlgebra(realField)(2)
    var O = CompositionAlgebra(realField)(3)

    R.should.be.instanceOf(Function)
    C.should.be.instanceOf(Function)
    H.should.be.instanceOf(Function)
    O.should.be.instanceOf(Function)
  })

  it('returns a Scalar class', () => {
    var R = CompositionAlgebra(realField)(0)
    var C = CompositionAlgebra(realField)(1)

    R.addition(2, 3).should.be.eql(5)

    var x = new R(2)
    x.data.should.be.eql(2)

    x.addition(3).data.should.be.eql(5)

    C.addition([1, 2], [3, 4]).should.be.eql([4, 6])

    var z = new C([1, 2])
    z.data.should.be.eql([1, 2])

    z.addition([3, 4]).data.should.be.eql([4, 6])
  })
})
