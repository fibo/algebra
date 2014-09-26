
var algebra = require('algebra')
  , should  = require('should')

var V = algebra.VectorSpace
  , R = algebra.Real

describe('Real vector example', function () {
  var R2
    , vector1
    , vector2
    , vector3
    , vector4

  it('creates a vector space over R, with dim = 2', function () {
    R2 = new V(R, 2)
  })

  it('creates few vectors', function () {
    vector1 = new R2.Vector([1, 2])
    vector2 = new R2.Vector([-1, 1])
    vector3 = new R2.Vector([0, 1])
    vector4 = new R2.Vector([2, 0])
  })

  it('creates vector1 and adds it to itself', function () {
    vector1.addition(vector1)
    vector1.data.should.be.eql([2, 4])
  })

  it('creates vector2 and adds it to vector1', function () {
    vector1.addition(vector2)
    vector1.data.should.be.eql([1, 5])
  })

  it('shows that addition accepts raw data', function () {
    vector1.addition([1, 1])
    vector1.data.should.be.eql([2, 6])
  })

  it('shows that addition is chainable', function () {
    vector1.addition(vector2).addition(vector3)
    vector1.data.should.be.eql([1, 8])
  })

  it('shows that addition accepts more than one argument', function () {
    vector1.addition(vector2, vector3, vector4)
    vector1.data.should.be.eql([2, 10])
  })
})

