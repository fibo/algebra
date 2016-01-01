describe('tensorSpace', () => {
  var tensorSpace = require('algebra').tensorSpace

  var ring = require('algebra-ring')([0, 1], {
    contains (a) { return (typeof a === 'number' && isFinite(a)) },
    equality: (a, b) => { return a === b },
    addition: (a, b) => { return a + b },
    negation: (a) => { return -a },
    multiplication: (a, b) => { return a * b },
    inversion: (a) => { return 1 / a },
  })

  it('can create a Scalar', () => {
    var indices = [1]

    var Scalar = tensorSpace(indices)(ring)

    Scalar.zero.should.be.eql(0)

    Scalar.order.should.be.eql(0)

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

    var Vector = tensorSpace(indices)(ring)

    Vector.zero.should.be.eql([0, 0])

    Vector.order.should.be.eql(1)

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

    var Matrix = tensorSpace(indices)(ring)

    Matrix.zero.should.be.eql([0, 0,
                               0, 0])

    Matrix.order.should.be.eql(2)

    Matrix.addition([1, 0,
                     0, 1], [1, -1,
                             0,  1]).should.be.eql([2, -1,
                                                    0,  2])

    Matrix.addition([1, 0,
                     0, 1], [1, -1,
                             0,  1], [2, 1,
                                      1, 2]).should.be.eql([4, 0,
                                                            1, 4])

    Matrix.subtraction([1, 0,
                        0, 1], [1, -1,
                                0,  1]).should.be.eql([0, 1,
                                                       0, 0])

    Matrix.subtraction([1, 0,
                        0, 1], [1, -1,
                                0,  1], [2, 1,
                                         1, 2]).should.be.eql([-2,  0,
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
})
