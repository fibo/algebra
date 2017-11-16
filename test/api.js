/* eslint-disable indent */

describe('API', () => {
  var algebra = require('algebra')

  var C = algebra.C
  var Complex = algebra.Complex
  var H = algebra.H
  var Quaternion = algebra.Quaternion
  var R = algebra.R
  var R2 = algebra.R2
  var R3 = algebra.R3
  var R2x2 = algebra.R2x2
  var Real = algebra.Real
  var CompositionAlgebra = algebra.CompositionAlgebra
  var MatrixSpace = algebra.MatrixSpace
  var TensorSpace = algebra.TensorSpace
  var VectorSpace = algebra.VectorSpace

  var Boole = algebra.Boole

  describe('About operators', () => {
    it('works', () => {
      var vector1 = new R2([1, 2])
      var vector2 = new R2([3, 4])

      R2.addition(vector1, [3, 4]).should.deepEqual([4, 6])
      R2.addition([1, 2], vector2).should.deepEqual([4, 6])
      R2.addition(vector1, vector2).should.deepEqual([4, 6])

      var vector3 = vector1.addition([3, 4])
      var vector4 = vector1.addition(vector2)
      R2.equality(vector3, vector4).should.be.ok()

      vector1.addition(vector1, vector1).equality([3, 6]).should.be.ok()

      vector1.data.should.deepEqual([1, 2])
    })
  })

  describe('CompositionAlgebra', () => {
    var Bit = CompositionAlgebra(Boole)

    it('works', () => {
      Bit.contains(false).should.be.ok()
      Bit.contains(4).should.not.be.ok()

      var bit = new Bit(true)
      bit.addition(false).data.should.eql(true)
    })
  })

  describe('Byte', () => {
    it('is an octonion over binary field' /*, () => {
      var Byte = CompositionAlgebra(Boole, 8)

      var t = true
      var f = false

      var byte1 = new Byte([t, f, f, f, f, f, f, f])
      var byte2 = new Byte([f, t, f, f, f, f, f, f])
      var byte3 = new Byte([f, f, t, f, f, f, f, f])
      var byte4 = new Byte([f, f, f, t, f, f, f, f])
      var byte5 = new Byte([f, f, f, f, t, f, f, f])
      var byte6 = new Byte([f, f, f, f, f, t, f, f])
      var byte7 = new Byte([f, f, f, f, f, f, t, f])
      var byte8 = new Byte([f, f, f, f, f, f, f, t])

      byte1.mul(byte1).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte2.mul(byte2).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte3.mul(byte3).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte4.mul(byte4).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte5.mul(byte5).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte6.mul(byte6).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte7.mul(byte7).data.should.deepEqual([t, f, f, f, f, f, f, f])
      byte8.mul(byte8).data.should.deepEqual([t, f, f, f, f, f, f, f])

      var max = byte1.add(byte2).add(byte3).add(byte4)
                       .add(byte5).add(byte6).add(byte7).add(byte8)

      max.data.should.deepEqual([t, t, t, t, t, t, t, t])
    } */)
  })

  describe('Scalar', () => {
    // TODO Color space RBG as example
    //
    // colorA = (.2, .3, .7)
    // colorB = (.1, .1, .1)
    //
    // colorC = colorA * colorB = (.2 * .1, .3 * .1, .7 * .1)
    // colorD = colorA + colorB = (.2 + .1 / 2, .3 + .1 / 2, .7 + .1 / 2)
    //
    // is it a Ring?
    describe('Scalar.one', () => {
      it('is a static attribute')
    })

    describe('Scalar.zero', () => {
      it('is a static attribute')
    })

    describe('order', () => {
      it('works')
    })

    describe('data', () => {
      it('works')
    })

    describe('contains', () => {
      it('works')
    })

    describe('belongsTo', () => {
      it('works')
    })

    describe('equality', () => {
      it('works')
    })

    describe('disequality', () => {
      it('works')
    })

    describe('addition', () => {
      it('works')
    })

    describe('subtraction', () => {
      it('works')
    })

    describe('multiplication', () => {
      it('works')
    })

    describe('division', () => {
      it('works')
    })

    describe('negation', () => {
      it('works')
    })

    describe('inversion', () => {
      it('works')
    })

    describe('conjugation', () => {
      it('works')
    })
  })

  describe('Cyclic', () => {
    it('works', () => {
      var Cyclic = algebra.Cyclic

      var elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

      var Alphanum = Cyclic(elements)

      Alphanum.addition('a', 'b').should.eql('c')

      var x = new Alphanum('a')

      var y = x.add('c', 'a', 't')
               .mul('i', 's')
               .add('o', 'n')
               .sub('t', 'h', 'e')
               .div('t', 'a', 'b', 'l', 'e')

      y.data.should.eql('s')

      var VectorStrings2 = algebra.VectorSpace(Alphanum)(2)
      var MatrixStrings2x2 = algebra.MatrixSpace(Alphanum)(2)

      var vectorOfStrings = new VectorStrings2(['o', 'k'])
      var matrixOfStrings = new MatrixStrings2x2(['c', 'o',
                                                    'o', 'l'])
      matrixOfStrings.mul(vectorOfStrings)
                     .data.should.deepEqual(['x', 'y'])

      vectorOfStrings.mul(matrixOfStrings)
                     .data.should.deepEqual(['x', 'y'])
    })
  })

  describe('Real', () => {
    it('works', () => {
      var Real = algebra.Real

      Real.addition(1, 2).should.eql(3)

      var pi = new Real(Math.PI)
      var twoPi = pi.mul(2)

      Real.subtraction(twoPi, 2 * Math.PI).should.eql(0)
    })
  })

  describe('Complex', () => {
    it('works', () => {
      var Complex = algebra.Complex
      var complex1 = new Complex([1, 2])

      complex1.conjugation().data.should.deepEqual([1, -2])
    })
  })

  describe('Quaternion', () => {
    it('works')
  })

  describe('Octonion', () => {
    it('works')
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
    describe('Vector.dimension', () => {
      it('is a static attribute', () => {
        R2.dimension.should.eql(2)
        R3.dimension.should.eql(3)
      })
    })

    describe('vector.dimension', () => {
      it('is an attribute', () => {
        var vector = new R2([1, 1])

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
        var vector = new R2([1, 2])

        vector.norm.data.should.eql(5)
      })
    })

    describe('addition', () => {
      it('works', () => {
        R2.addition([2, 1], [1, 2]).should.deepEqual([3, 3])

        var vector1 = new R2([2, 1])
        var vector2 = new R2([2, 2])

        var vector3 = vector1.addition(vector2)

        vector3.data.should.deepEqual([4, 3])
      })
    })

    describe('Cross product', () => {
      it('works', () => {
        R3.crossProduct([3, -3, 1], [4, 9, 2]).should.deepEqual([-15, -2, 39])

        var vector1 = new R3([3, -3, 1])
        var vector2 = new R3([4, 9, 2])

        var vector3 = vector1.crossProduct(vector2)

        vector3.data.should.deepEqual([-15, -2, 39])
      })
    })
  })

  describe('Tensor', () => {
    describe('equality', () => {
      it('works', () => {
        var T2x2x2 = TensorSpace(Real)([2, 2, 2])

        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])

        T2x2x2.equality(tensor1, tensor1).should.be.ok()
        T2x2x2.equality(tensor1, tensor2).should.not.be.ok()

        tensor1.equality(tensor1).should.be.ok()
        tensor1.equality(tensor2).should.not.be.ok()
      })
    })
  })
})
