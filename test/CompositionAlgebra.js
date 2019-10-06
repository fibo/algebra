/* eslint-env mocha */

const CompositionAlgebra = require('../src/CompositionAlgebra')
const realField = require('../src/realField')

describe('CompositionAlgebra', () => {
  it('checks n is 1, 2, 4 or 8', () => {
    ;(() => {
      CompositionAlgebra(realField, 3)
    }).should.throw()
  })

  it('has signature (field, num)', () => {
    const R = CompositionAlgebra(realField, 1)
    const C = CompositionAlgebra(realField, 2)
    const H = CompositionAlgebra(realField, 4)
    const O = CompositionAlgebra(realField, 8)

    R.should.be.instanceOf(Function)
    C.should.be.instanceOf(Function)
    H.should.be.instanceOf(Function)
    O.should.be.instanceOf(Function)
  })

  it('returns a Scalar class', () => {
    const R = CompositionAlgebra(realField, 1)
    const C = CompositionAlgebra(realField, 2)

    R.addition(2, 3).should.be.eql(5)

    const x = new R(2)
    x.data.should.be.eql(2)

    x.addition(3).data.should.be.eql(5)

    C.addition([1, 2], [3, 4]).should.be.eql([4, 6])

    const z = new C([1, 2])
    z.data.should.be.eql([1, 2])

    z.addition([3, 4]).data.should.be.eql([4, 6])
  })
})
