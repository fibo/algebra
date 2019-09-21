/* eslint-disable indent */
/* eslint-env mocha */

describe('Quick start', () => {
  const algebra = require('algebra')

  it('works', () => {
    const R = algebra.Real

    R.add(1, 2, 3).should.eql(6)

    let x = new R(2)
    const y = new R(-2)

    const r = x.mul(y)
    r.data.should.eql(-4)
    x.data.should.eql(2)

    x = x.add(3).mul(2).inv()

    x.data.should.eql(0.1)

    x.equal(0.1).should.be.ok()
    x.notEqual(Math.PI).should.be.ok()

    const C = algebra.Complex

    let z1 = new C([1, 2])
    const z2 = new C([3, 4])

    z1 = z1.mul(z2)

    z1.data.should.eql([-5, 10])

    z1 = z1.conj().mul([2, 0])

    z1.data.should.eql([-10, -20])

    const R2 = algebra.VectorSpace(R)(2)

    let v1 = new R2([0, 1])
    const v2 = new R2([1, -2])

    v1 = v1.add(v2)

    v1.data.should.eql([1, -1])

    const R3x2 = algebra.MatrixSpace(R)(3, 2)

    const m1 = new R3x2([1, 1,
                         0, 1,
                         1, 0])

    const v3 = m1.mul(v1)

    v3.data.should.deepEqual([0, -1, 1])

    const R2x2 = algebra.MatrixSpace(R)(2)

    let m2 = new R2x2([1, 0,
                       0, 2])
    const m3 = new R2x2([0, -1,
                         1, 0])

    m2 = m2.mul(m3)

    m2.data.should.deepEqual([0, -1,
                              2, 0])

    m2.determinant.data.should.be.eql(2)
  })
})
