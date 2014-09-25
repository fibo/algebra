
var algebra = require('algebra')
  , should  = require('should')

var V = algebra.VectorSpace
  , R = algebra.Real

describe('Real vector example', function () {
  var R2 = new V(R, 2)
    , vector1
    , vector2

  it('creates two 2-dim vectors', function () {
    vector1 = new R2.Vector([1, 2])
    vector2 = new R2.Vector([0, 1])
  })

  it('adds them', function () {
    vector3 = vector1.addition(vector2)

    vector3.should.be.instanceOf(R2.Vector)
    vector3.data.should.be.eql([1, 3])
  })
})
