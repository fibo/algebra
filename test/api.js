describe('API', () => {
  const algebra = require('algebra')

  const C = algebra.C
  const Complex = algebra.Complex
  const H = algebra.H
  const Quaternion = algebra.Quaternion
  const R = algebra.R
  const R2 = algebra.R2
  const R3 = algebra.R3
  const R2x2 = algebra.R2x2
  const Real = algebra.Real
  const CompositionAlgebra = algebra.CompositionAlgebra
  const MatrixSpace = algebra.MatrixSpace
  const TensorSpace = algebra.TensorSpace
  const VectorSpace = algebra.VectorSpace

  const binaryField = require('../src/binaryField')

  describe('About operators', () => {
    it('works', () => {
      const vector1 = new R2([1, 2])
      const vector2 = new R2([3, 4])

      R2.addition(vector1, [3, 4]).should.deepEqual([4, 6])
      R2.addition([1, 2], vector2).should.deepEqual([4, 6])
      R2.addition(vector1, vector2).should.deepEqual([4, 6])

      const vector3 = vector1.addition([3, 4])
      const vector4 = vector1.addition(vector2)
      R2.equality(vector3, vector4).should.be.ok

      vector1.addition(vector1, vector1).equality([4, 6]).should.be.ok

      vector1.data.should.deepEqual([1, 2])
    })
  })

  describe('CompositionAlgebra', () => {
    const Bit = CompositionAlgebra(binaryField)

    it('works', () => {
      Bit.contains(1).should.be.ok
      Bit.contains(4).should.be.ko

      const bit = new Bit(1)
      bit.addition(0).data.should.eql(1)
    })
  })

  describe('Byte', () => {
    it('is an octonion over binary field', () => {
      const Byte = CompositionAlgebra(binaryField, 8)

      const byte1 = new Byte([1, 0, 0, 0, 0, 0, 0, 0])
      const byte2 = new Byte([0, 1, 0, 0, 0, 0, 0, 0])
      const byte3 = new Byte([0, 0, 1, 0, 0, 0, 0, 0])
      const byte4 = new Byte([0, 0, 0, 1, 0, 0, 0, 0])
      const byte5 = new Byte([0, 0, 0, 0, 1, 0, 0, 0])
      const byte6 = new Byte([0, 0, 0, 0, 0, 1, 0, 0])
      const byte7 = new Byte([0, 0, 0, 0, 0, 0, 1, 0])
      const byte8 = new Byte([0, 0, 0, 0, 0, 0, 0, 1])

      byte1.mul(byte1).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte2.mul(byte2).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte3.mul(byte3).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte4.mul(byte4).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte5.mul(byte5).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte6.mul(byte6).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte7.mul(byte7).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte8.mul(byte8).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])

      const max = byte1.add(byte2).add(byte3).add(byte4)
                       .add(byte5).add(byte6).add(byte7).add(byte8)

      max.data.should.deepEqual([1, 1, 1, 1, 1, 1, 1, 1])
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

  describe('Common spaces', () => {
    describe('R', () => {
      it('is an alias of Real', () => {
        R.should.be.eql(Real)
      })
    })

    describe('R2', () => {
      it('is an alias of VectorSpace(Real)(2)', () => {
        R2.should.be.eql(VectorSpace(Real)(2))
      })
    })

    describe('R3', () => {
      it('is an alias of VectorSpace(Real)(3)', () => {
        R3.should.be.eql(VectorSpace(Real)(3))
      })
    })

    describe('R2x2', () => {
      it('is an alias of MatrixSpace(Real)(2)', () => {
        R2x2.should.be.eql(MatrixSpace(Real)(2))
      })
    })

    describe('C', () => {
      it('is an alias of Complex', () => {
        C.should.be.eql(Complex)
      })
    })

    describe('H', () => {
      it('is an alias of Quaternion', () => {
        H.should.be.eql(Quaternion)
      })
    })
  })

  describe('Vector', () => {
    describe('vector.dimension', () => {
      it('is an attribute', () => {
        const vector = new R2([1, 1])

        vector.dimension.should.eql(2)
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

  describe('Tensor', () => {
    describe('equality', () => {
      it('works', () => {
        const T2x2x2 = TensorSpace(Real)([2, 2, 2])

        const tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        const tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])

        T2x2x2.equality(tensor1, tensor1).should.be.ok
        T2x2x2.equality(tensor1, tensor2).should.be.ko

        tensor1.equality(tensor1).should.be.ok
        tensor2.equality(tensor2).should.be.ko
      })
    })
  })
})
