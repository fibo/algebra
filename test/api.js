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
  var Scalar = algebra.Scalar
  var MatrixSpace = algebra.MatrixSpace
  var TensorSpace = algebra.TensorSpace
  var VectorSpace = algebra.VectorSpace

  var booleanField = require('../src/booleanField')

  describe('About operators', () => {
    it('works', () => {
      var vector1 = new R2([1, 2])
      var vector2 = new R2([3, 4])

      R2.addition(vector1, [3, 4]).should.deepEqual([4, 6])
      R2.addition([1, 2], vector2).should.deepEqual([4, 6])
      R2.addition(vector1, vector2).should.deepEqual([4, 6])

      var vector3 = vector1.addition([3, 4])
      var vector4 = vector1.addition(vector2)
      R2.equality(vector3, vector4).should.be.ok

      vector1.addition(vector1, vector1).equality([4, 6]).should.be.ok

      vector1.data.should.deepEqual([1, 2])
    })
  })

  describe('Bool', () => {
    var Bool = Scalar(booleanField)

    it('works', () => {
      Bool.contains(true).should.be.ok
      Bool.contains(1).should.be.ko

      Bool.addition(true, false).should.eql(true)

      var t = new Bool(true)
      t.negation().data.should.eql(false)
    })
  })

  describe('Byte', () => {
    it('is an octionion of booleans'/*, () => {
      var f = false
      var t = true

      var Byte = Scalar(booleanField, 8)
      var byte1 = new Byte([t, f, f, f, f, f, f, f])
    }*/)
  })

  describe('Cyclic', () => {
    it('works'/*, () => {
      var Cyclic = algebra.Cyclic

      var elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

      var Alphanum = Cyclic(elements)

      var a = new Alphanum('a')
      a.data.should.eql('a')
    }*/)
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

  describe('Tensor', () => {
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

        T2x2x2.equality(tensor1, tensor1).should.be.ok
        T2x2x2.equality(tensor1, tensor2).should.be.ko

        tensor1.equality(tensor1).should.be.ok
        tensor2.equality(tensor2).should.be.ko
      })
    })
  })
})
