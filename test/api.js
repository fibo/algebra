/* eslint-disable indent */
/* eslint-env mocha */

/* global BigInt */

describe('API', () => {
  const algebra = require('algebra')

  // const C = algebra.C
  // const C2x2 = algebra.C2x2
  // const Complex = algebra.Complex
  // const H = algebra.H
  // const Quaternion = algebra.Quaternion
  // const R = algebra.R
  const R2 = algebra.R2
  const R3 = algebra.R3
  // const R2x2 = algebra.R2x2
  // const Real = algebra.Real
  const CompositionAlgebra = algebra.CompositionAlgebra
  // const MatrixSpace = algebra.MatrixSpace
  // const VectorSpace = algebra.VectorSpace

  const Boole = algebra.Boole

  describe('About operators', () => {
    it('works', () => {
      const vector1 = new R2([1, 2])
      const vector2 = new R2([3, 4])

      R2.addition(vector1, [3, 4]).should.deepEqual([4, 6])
      R2.addition([1, 2], vector2).should.deepEqual([4, 6])
      R2.addition(vector1, vector2).should.deepEqual([4, 6])

      const vector3 = vector1.addition([3, 4])
      const vector4 = vector1.addition(vector2)
      R2.equality(vector3, vector4).should.be.ok()

      vector1.addition(vector1).equality([2, 4]).should.be.ok()

      vector1.data.should.deepEqual([1, 2])
    })
  })

  describe('CompositionAlgebra', () => {
    const Bit = CompositionAlgebra(Boole)

    it('works', () => {
      Bit.contains(false).should.be.ok()
      Bit.contains(4).should.not.be.ok()

      const bit = new Bit(true)
      bit.addition(false).data.should.eql(true)
    })
  })

  describe('Byte', () => {
    it('is an octonion over binary field', () => {
      const Byte = CompositionAlgebra(Boole, 8)

      const t = true
      const f = false

      const byte1 = new Byte([t, f, f, f, f, f, f, f])
      const byte2 = new Byte([f, t, f, f, f, f, f, f])
      const byte3 = new Byte([f, f, t, f, f, f, f, f])
      const byte4 = new Byte([f, f, f, t, f, f, f, f])
      const byte5 = new Byte([f, f, f, f, t, f, f, f])
      const byte6 = new Byte([f, f, f, f, f, t, f, f])
      const byte7 = new Byte([f, f, f, f, f, f, t, f])
      const byte8 = new Byte([f, f, f, f, f, f, f, t])

      byte1.mul(byte1).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte2.mul(byte2).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte3.mul(byte3).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte4.mul(byte4).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte5.mul(byte5).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte6.mul(byte6).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte7.mul(byte7).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte8.mul(byte8).data.should.deepEqual([t, f, f, f, f, f, f, f])

      const max = byte1.add(byte2).add(byte3).add(byte4)
                       .add(byte5).add(byte6).add(byte7).add(byte8)

      max.data.should.deepEqual([t, t, t, t, t, t, t, t])
    })
  })

  describe('Scalar', () => {
    const Big = algebra.Scalar(
      [ BigInt(0), BigInt(1) ],
      {
        equality: (a, b) => a === b,
        // eslint-disable-next-line
        contains: (a) => typeof a === 'bigint',
        addition: (a, b) => a + b,
        negation: (a) => -a,
        multiplication: (a, b) => a * b,
        inversion: (a) => 1 / a
      }
    )

    describe('Scalar.one', () => {
      it('is a static attribute', () => {
        Big.one.should.be.equal(BigInt(1))
      })
    })

    describe('Scalar.zero', () => {
      it('is a static attribute', () => {
        Big.zero.should.be.equal(BigInt(0))
      })
    })

    describe('scalar.data', () => {
      it('works')
    })

    describe('Scalar.contains', () => {
      it('works')
    })

    describe('scalar.belongsTo', () => {
      it('works')
    })

    describe('Scalar.equality', () => {
      it('works')
    })

    describe('scalar.equality', () => {
      it('works')
    })

    describe('Scalar.disequality', () => {
      it('works')
    })

    describe('scalar.disequality', () => {
      it('works')
    })

    describe('Scalar.addition', () => {
      it('works')
    })

    describe('scalar.addition', () => {
      it('works')
    })

    describe('Scalar.subtraction', () => {
      it('works')
    })

    describe('scalar.subtraction', () => {
      it('works')
    })

    describe('Scalar.multiplication', () => {
      it('works')
    })

    describe('scalar.multiplication', () => {
      it('works')
    })

    describe('Scalar.division', () => {
      it('works')
    })

    describe('scalar.division', () => {
      it('works')
    })

    describe('Scalar.negation', () => {
      it('works')
    })

    describe('scalar.negation', () => {
      it('works')
    })

    describe('Scalar.inversion', () => {
      it('works')
    })

    describe('scalar.inversion', () => {
      it('works')
    })

    describe('Scalar.conjugation', () => {
      it('works')
    })

    describe('scalar.conjugation', () => {
      it('works')
    })
  })

  describe('Cyclic', () => {
    it('works', () => {
      const Cyclic = algebra.Cyclic

      const elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

      const Alphanum = Cyclic(elements)

      Alphanum.addition('a', 'b').should.eql('c')

      const x = new Alphanum('a')

      const y = x.add('c', 'a', 't')
                 .mul('i', 's')
                 .add('o', 'n')
                 .sub('t', 'h', 'e')
                 .div('t', 'a', 'b', 'l', 'e')

      y.data.should.eql('s')

      const VectorStrings2 = algebra.VectorSpace(Alphanum)(2)
      const MatrixStrings2x2 = algebra.MatrixSpace(Alphanum)(2)

      const vectorOfStrings = new VectorStrings2(['o', 'k'])
      const matrixOfStrings = new MatrixStrings2x2(['c', 'o',
                                                    'o', 'l'])

      matrixOfStrings.mul(vectorOfStrings)
                     .data.should.deepEqual(['x', 'y'])

      vectorOfStrings.mul(matrixOfStrings)
                     .data.should.deepEqual(['x', 'y'])
    })
  })

  describe('Real', () => {
    it('works', () => {
      const Real = algebra.Real

      Real.addition(1, 2).should.eql(3)

      const pi = new Real(Math.PI)
      const twoPi = pi.mul(2)

      Real.subtraction(twoPi, 2 * Math.PI).should.eql(0)
    })
  })

  describe('Complex', () => {
    it('works', () => {
      const Complex = algebra.Complex
      const complex1 = new Complex([1, 2])

      complex1.conjugation().data.should.deepEqual([1, -2])
    })
  })

  describe('Quaternion', () => {
    it('works')
  })

  describe('Octonion', () => {
    it('works')
  })

  describe('Vector', () => {
    describe('Vector.dimension', () => {
      it('is a static attribute', () => {
        R2.dimension.should.eql(2)
        R3.dimension.should.eql(3)
      })
    })

    describe('vector.dimension', () => {
      it('is an attribute', () => {
        const vector = new R2([1, 1])

        vector.dimension.should.eql(2)
      })
    })

    describe('Vector.norm', () => {
      it('is a static operator', () => {
        R2.norm([3, 4]).data.should.eql(25)
      })
    })

    describe('vector.norm', () => {
      it('is an attribute', () => {
        const vector = new R2([1, 2])

        vector.norm.data.should.eql(5)
      })
    })

    describe('addition', () => {
      it('works', () => {
        R2.addition([2, 1], [1, 2]).should.deepEqual([3, 3])

        const vector1 = new R2([2, 1])
        const vector2 = new R2([2, 2])

        const vector3 = vector1.addition(vector2)

        vector3.data.should.deepEqual([4, 3])
      })
    })

    describe('Cross product', () => {
      it('works', () => {
        R3.crossProduct([3, -3, 1], [4, 9, 2]).should.deepEqual([-15, -2, 39])

        const vector1 = new R3([3, -3, 1])
        const vector2 = new R3([4, 9, 2])

        const vector3 = vector1.crossProduct(vector2)

        vector3.data.should.deepEqual([-15, -2, 39])
      })
    })
  })
})
