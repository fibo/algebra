/* eslint-disable indent */
/* eslint-env mocha */

/* global BigInt */

describe('API', () => {
  const algebra = require('algebra')

  const R2 = algebra.R2
  const R3 = algebra.R3
  const CompositionAlgebra = algebra.CompositionAlgebra

  const Boole = algebra.Boole
  const Quaternion = algebra.Quaternion
  const Octonion = algebra.Octonion

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
    function greatCommonDivisor (a, b) {
      if (b === BigInt(0)) {
        return a
      } else {
        return greatCommonDivisor(b, a % b)
      }
    }

    function normalizeRational ([numerator, denominator]) {
      const divisor = greatCommonDivisor(numerator, denominator)

      return denominator > 0 ? (
        [numerator / divisor, denominator / divisor]
      ) : (
        [-numerator / divisor, -denominator / divisor]
      )
    }

    const Rational = algebra.Scalar({
      zero: [BigInt(0), BigInt(1)],
      one: [BigInt(1), BigInt(1)],
      equality: ([n1, d1], [n2, d2]) => (n1 * d2 === n2 * d1),
      // eslint-disable-next-line
      contains: ([n, d]) => (typeof n === 'bigint' && typeof d === 'bigint'),
      addition: ([n1, d1], [n2, d2]) => normalizeRational([n1 * d2 + n2 * d1, d1 * d2]),
      negation: ([n, d]) => ([-n, d]),
      multiplication: ([n1, d1], [n2, d2]) => normalizeRational([n1 * n2, d1 * d2]),
      inversion: ([n, d]) => ([d, n])
    })

    const half = new Rational([BigInt(1), BigInt(2)])
    const two = new Rational([BigInt(2), BigInt(1)])

    describe('Scalar.one', () => {
      it('is a static attribute', () => {
        Rational.one[0].should.be.deepEqual(BigInt(1))
        Rational.one[1].should.be.deepEqual(BigInt(1))
      })
    })

    describe('Scalar.zero', () => {
      it('is a static attribute', () => {
        Rational.zero[0].should.be.equal(BigInt(0))
        Rational.zero[1].should.be.equal(BigInt(1))
      })
    })

    describe('scalar.data', () => {
      it('works', () => {
        half.data[0].should.be.eql(BigInt(1))
        half.data[1].should.be.eql(BigInt(2))
      })
    })

    describe('Scalar.contains', () => {
      it('works', () => {
        Rational.contains(half).should.be.ok()
        Rational.contains([BigInt(1), BigInt(2)]).should.be.ok()
      })
    })

    describe('scalar.belongsTo', () => {
      it('works', () => {
        half.belongsTo(Rational).should.be.ok()
      })
    })

    describe('Scalar.equality', () => {
      it('works', () => {
        Rational.equality(half, [BigInt(5), BigInt(10)]).should.be.ok()
        Rational.equality(two, [BigInt(-4), BigInt(-2)]).should.be.ok()
      })
    })

    describe('scalar.equality', () => {
      it('works', () => {
        half.equality([BigInt(2), BigInt(4)]).should.be.ok()
      })
    })

    describe('Scalar.disequality', () => {
      it('works', () => {
        Rational.disequality(half, two).should.be.ok()
      })
    })

    describe('scalar.disequality', () => {
      it('works', () => {
        half.disequality(two).should.be.ok()
      })
    })

    describe('Scalar.addition', () => {
      it('works', () => {
        const result = Rational.addition(half, two)

        result[0].should.eql(BigInt(5))
        result[1].should.eql(BigInt(2))
      })
    })

    describe('scalar.addition', () => {
      it('works', () => {
        const result = half.addition(two)

        result.data[0].should.eql(BigInt(5))
        result.data[1].should.eql(BigInt(2))
      })
    })

    describe('Scalar.subtraction', () => {
      it('works', () => {
        const result = Rational.subtraction(two, half)

        result[0].should.eql(BigInt(3))
        result[1].should.eql(BigInt(2))
      })
    })

    describe('scalar.subtraction', () => {
      it('works', () => {
        const result = two.subtraction(half)

        result.data[0].should.eql(BigInt(3))
        result.data[1].should.eql(BigInt(2))
      })
    })

    describe('Scalar.multiplication', () => {
      it('works', () => {
        const result = Rational.multiplication(half, two)

        result[0].should.eql(BigInt(1))
        result[1].should.eql(BigInt(1))
      })
    })

    describe('scalar.multiplication', () => {
      it('works', () => {
        const result = half.multiplication(two)

        result.data[0].should.eql(BigInt(1))
        result.data[1].should.eql(BigInt(1))
      })
    })

    describe('Scalar.division', () => {
      it('works', () => {
        const result = Rational.division(half, two)

        result[0].should.eql(BigInt(1))
        result[1].should.eql(BigInt(4))
      })
    })

    describe('scalar.division', () => {
      it('works', () => {
        const result = half.division(two)

        result.data[0].should.eql(BigInt(1))
        result.data[1].should.eql(BigInt(4))
      })
    })

    describe('Scalar.negation', () => {
      it('works', () => {
        const result = Rational.negation(two)

        result[0].should.eql(BigInt(-2))
        result[1].should.eql(BigInt(1))
      })
    })

    describe('scalar.negation', () => {
      it('works', () => {
        const result = two.negation()

        result.data[0].should.eql(BigInt(-2))
        result.data[1].should.eql(BigInt(1))
      })
    })

    describe('Scalar.inversion', () => {
      it('works', () => {
        const result = Rational.inversion(two)

        result[0].should.eql(BigInt(1))
        result[1].should.eql(BigInt(2))
      })
    })

    describe('scalar.inversion', () => {
      it('works', () => {
        const result = two.inversion()

        result.data[0].should.eql(BigInt(1))
        result.data[1].should.eql(BigInt(2))
      })
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
    it('works', () => {
      const j = new Quaternion([0, 1, 0, 0])
      const k = new Quaternion([0, 0, 1, 0])

      j.mul(k).equal(k.mul(j).neg()).should.be.ok()
    })
  })

  describe('Octonion', () => {
    it('works', () => {
      const a = new Octonion([0, 1, 0, 0, 0, 0, 0, 0])
      const b = new Octonion([0, 0, 0, 0, 0, 1, 0, 0])
      const c = new Octonion([0, 0, 0, 1, 0, 0, 0, 0])

      const abc1 = a.mul(b.mul(c))
      abc1.data.should.be.deepEqual([0, 0, 0, 0, 0, 0, 0, -1])

      const abc2 = a.mul(b).mul(c)
      abc2.data.should.be.deepEqual([0, 0, 0, 0, 0, 0, 0, 1])

      Octonion.equality(Octonion.negation(abc1), abc2)
    })
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
