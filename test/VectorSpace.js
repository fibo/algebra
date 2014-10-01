
var algebra = require('..')
  , should = require('should')

var VectorSpace = algebra.VectorSpace
  , Real = algebra.Real

var R2 = new VectorSpace(Real, 2)

describe('VectorSpace', function () {
  describe('constructor', function () {
    it('has signature (Field, dimension)', function () {
      R2.should.be.instanceOf(VectorSpace)
    })
  })

  describe('addition()', function () {
    it('implements static addition operator', function () {
      var data = R2.addition([0, 2], [-1, 3])

      data.should.eql([-1, 5])
    })
  })

  describe('Vector', function () {/*
    var R2 = new VectorSpace(Real, 2)
    var vector = R2.Vector([0, 1])
  */})
})

