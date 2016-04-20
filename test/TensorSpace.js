describe('TensorSpace', () => {
  var algebra = require('algebra')
  var TensorSpace = algebra.TensorSpace
  var Real = algebra.Real

  var T2x2x2 = TensorSpace(Real)([2, 2, 2])

  it('can create a Scalar', () => {
    var indices = [1]

    var Scalar = TensorSpace(Real)(indices)

    Scalar.zero.should.be.eql(0)

    Scalar.addition(1, 2).should.be.eql(3)
    Scalar.addition(1, 2, 3).should.be.eql(6)

    Scalar.subtraction(1, 2).should.be.eql(-1)
    Scalar.subtraction(1, 2, 3).should.be.eql(-4)

    var x = new Scalar(1)
    x.data.should.be.eql(1)

    x.addition(2).data.should.be.eql(3)
    x.addition(2, 3, 4).data.should.be.eql(10)

    x.subtraction(2).data.should.be.eql(-1)
    x.subtraction(2, 3, 4).data.should.be.eql(-8)
  })

  it('can create a Vector', () => {
    var indices = [2]

    var Vector = TensorSpace(Real)(indices)

    Vector.zero.should.be.eql([0, 0])

    Vector.addition([1, 0], [1, -1]).should.be.eql([2, -1])
    Vector.addition([1, 0], [1, -1], [-1, 1]).should.be.eql([1, 0])

    Vector.subtraction([2, -1], [1, -1]).should.be.eql([1, 0])
    Vector.subtraction([1, -1], [2, -2], [3, -3]).should.be.eql([-4, 4])

    var v = new Vector([1, 2])
    v.data.should.be.eql([1, 2])

    v.addition([4, -1]).data.should.be.eql([5, 1])
    v.addition([4, -1], [-1, 1]).data.should.be.eql([4, 2])

    v.subtraction([2, 1]).data.should.be.eql([-1, 1])
    v.subtraction([2, 1], [1, -1]).data.should.be.eql([-2, 2])
  })

  it('can create a Matrix', () => {
    var indices = [2, 2]

    var Matrix = TensorSpace(Real)(indices)

    Matrix.zero.should.be.eql([0, 0,
                               0, 0])

    Matrix.addition([1, 0,
                     0, 1], [1, -1,
                             0, 1]).should.be.eql([2, -1,
                                                    0, 2])

    Matrix.addition([1, 0,
                     0, 1], [1, -1,
                             0, 1], [2, 1,
                                      1, 2]).should.be.eql([4, 0,
                                                            1, 4])

    Matrix.subtraction([1, 0,
                        0, 1], [1, -1,
                                0, 1]).should.be.eql([0, 1,
                                                      0, 0])

    Matrix.subtraction([1, 0,
                        0, 1], [1, -1,
                                0, 1], [2, 1,
                                        1, 2]).should.be.eql([-2, 0,
                                                              -1, -2])

    var m = new Matrix([1, 2,
                        3, 4])

    m.data.should.be.eql([1, 2,
                          3, 4])

    m.addition([1, 0,
                0, 1]).data.should.be.eql([2, 2,
                                           3, 5])

    m.subtraction([1, 0,
                   0, 1]).data.should.be.eql([0, 2,
                                              3, 3])
  })

  describe('attribute', () => {
    describe('order', () => {
      it('is 0 for scalars', () => {
        var Scalar = TensorSpace(Real)([1])
        Scalar.order.should.eql(0)

        var scalar1 = new Scalar(4)
        scalar1.order.should.eql(0)
      })

      it('is 1 for vectors', () => {
        var Vector = TensorSpace(Real)([2])
        Vector.order.should.eql(1)

        var vector1 = new Vector([1, 2])
        vector1.order.should.eql(1)
      })

      it('is 2 for matrices', () => {
        var Matrix = TensorSpace(Real)([2, 2])
        Matrix.order.should.eql(2)

        var matrix1 = new Matrix([1, 2,
                                  3, 4])
        matrix1.order.should.eql(2)
      })
    })
  })

  describe('operator', () => {
    describe('addition', () => {
      it('works', () => {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])
        var resultData = [3, 5, 7, 9, 11, 13, 15, 17]

        T2x2x2.addition(tensor1, tensor2).should.deepEqual(resultData)

        var tensor3 = tensor1.addition(tensor2)
        tensor3.data.should.deepEqual(resultData)
      })
    })

    describe('subtraction', () => {
      it('works', () => {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])
        var resultData = [-1, -1, -1, -1, -1, -1, -1, -1]

        T2x2x2.subtraction(tensor1, tensor2).should.deepEqual(resultData)

        var tensor3 = tensor1.subtraction(tensor2)
        tensor3.data.should.deepEqual(resultData)
      })
    })

    describe('scalarMultiplication', () => {
      it('works', () => {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var scalar1 = new Real(2)
        var resultData = [2, 4, 6, 8, 10, 12, 14, 16]

        T2x2x2.scalarMultiplication(tensor1, scalar1).should.deepEqual(resultData)

        var tensor2 = tensor1.scalarMultiplication(scalar1)
        tensor2.data.should.deepEqual(resultData)
      })
    })
  })
})
