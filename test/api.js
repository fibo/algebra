/* eslint-disable indent */

describe('API', () => {
  const algebra = require('algebra')

  const C = algebra.C
  const C2x2 = algebra.C2x2
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

      vector1.addition(vector1, vector1).equality([3, 6]).should.be.ok()

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
    const hexSum = (hex1, hex2) => {
      const dec1 = parseInt(hex1, 16) % 256
      const dec2 = parseInt(hex2, 16) % 256

      const hexResult = parseInt((dec1 + dec2) % 256, 10).toString(16)

      return hexResult.padStart(2, '0')
    }

    const splitColor = (color) => {
      const r = color.substring(0, 2)
      const g = color.substring(2, 4)
      const b = color.substring(4, 6)

      return [r, g, b]
    }

    const colorSum = (color1, color2) => {
      const [r1, g1, b1] = splitColor(color1)
      const [r2, g2, b2] = splitColor(color2)

      const r = hexSum(r1, r2)
      const g = hexSum(g1, g2)
      const b = hexSum(b1, b2)

      return [r, g, b].join('')
    }

    const hexMul = (hex1, hex2) => {
      const dec1 = parseInt(hex1, 16) % 256
      const dec2 = parseInt(hex2, 16) % 256

      const hexResult = parseInt((dec1 * dec2) / 255, 10).toString(16)

      return hexResult.padStart(2, '0')
    }

    const colorMul = (color1, color2) => {
      const [r1, g1, b1] = splitColor(color1)
      const [r2, g2, b2] = splitColor(color2)

      const r = hexMul(r1, r2)
      const g = hexMul(g1, g2)
      const b = hexMul(b1, b2)

      return [r, g, b].join('')
    }

    describe('Color space example', () => {
      describe('colorSum()', () => {
        it('is well defined', () => {
          colorSum('00ff00', '0000ff').should.equal('00ffff')
        })
      })
    })

    const RGB = algebra.Scalar(
      [ '000000', 'ffffff' ],
      {
        equality: (a, b) => a === b,
        contains: (color) => {
          const [r, g, b] = splitColor(color)

          return (parseInt(r, 16) < 256) && (parseInt(g, 16) < 256) && (parseInt(b, 16) < 256)
        },
        addition: colorSum,
        negation: (color) => {
          const [r, g, b] = splitColor(color)

          const decR = parseInt(r, 16)
          const decG = parseInt(g, 16)
          const decB = parseInt(b, 16)

          const minusR = decR === 0 ? 0 : 255 - decR
          const minusG = decG === 0 ? 0 : 255 - decG
          const minusB = decB === 0 ? 0 : 255 - decB

          const hexMinusR = parseInt(minusR, 10).toString(16)
          const hexMinusG = parseInt(minusG, 10).toString(16)
          const hexMinusB = parseInt(minusB, 10).toString(16)

          const paddedMinusR = hexMinusR.padStart(2, '0')
          const paddedMinusG = hexMinusG.padStart(2, '0')
          const paddedMinusB = hexMinusB.padStart(2, '0')

          return `${paddedMinusR}${paddedMinusG}${paddedMinusB}`
        },
        multiplication: colorMul,
        inversion: (color) => {
          const [r, g, b] = splitColor(color)

          const decR = parseInt(r, 16)
          const decG = parseInt(g, 16)
          const decB = parseInt(b, 16)

          const invR = parseInt(255 * 255 / decR, 10).toString(16)
          const invG = parseInt(255 * 255 / decG, 10).toString(16)
          const invB = parseInt(255 * 255 / decB, 10).toString(16)

          const paddedInvR = invR.padStart(2, '0')
          const paddedInvG = invG.padStart(2, '0')
          const paddedInvB = invB.padStart(2, '0')

          return `${paddedInvR}${paddedInvG}${paddedInvB}`
        }
      }
    )

    const green = new RGB('00ff00')
    const blue = new RGB('0000ff')

    const cyan = green.add(blue)

    describe('Color instances example', () => {
      it('works', () => {
        cyan.data.should.be.equal('00ffff')
      })
    })

    describe('Scalar.one', () => {
      it('is a static attribute', () => {
        RGB.one.should.be.equal('ffffff')
      })
    })

    describe('Scalar.zero', () => {
      it('is a static attribute', () => {
        RGB.zero.should.be.equal('000000')
      })
    })

    describe('Scalar.order', () => {
      it('is a static attribute', () => {
        RGB.order.should.be.equal(0)
      })
    })

    describe('scalar.order', () => {
      it('is an attribute', () => {
        green.order.should.eql(0)
      })
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

    describe('C2x2', () => {
      it('is an alias of MatrixSpace(Complex)(2)', () => {
        C2x2.should.be.eql(MatrixSpace(Complex)(2))
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

  describe('Tensor', () => {
    describe('equality', () => {
      it('works', () => {
        const T2x2x2 = TensorSpace(Real)([2, 2, 2])

        const tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        const tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])

        T2x2x2.equality(tensor1, tensor1).should.be.ok()
        T2x2x2.equality(tensor1, tensor2).should.not.be.ok()

        tensor1.equality(tensor1).should.be.ok()
        tensor1.equality(tensor2).should.not.be.ok()
      })
    })
  })
})
