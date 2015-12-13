describe('TensorSpace', () => {
  var TensorSpace = require('algebra').TensorSpace

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
    var rank = [1, 0]

    var Scalar = TensorSpace(indices, rank)(ring)

    Scalar.addition(1, 2).should.be.eql(3)
    Scalar.addition(1, 2, 3).should.be.eql(6)
  })

  it('can create a Vector', () => {
    var indices = [2]
    var rank = [1, 0]

    var Vector = TensorSpace(indices, rank)(ring)

    Vector.addition([1, 0], [1, -1]).should.be.eql([2, -1])
  })
})
