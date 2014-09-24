
var algebra = require('..')
  , should  = require('should')

var AlgebraElement     = algebra.AlgebraElement
  ,  QuaternionElement = algebra.QuaternionElement

var element = new QuaternionElement()
  , one     = new QuaternionElement(1) // TODO use me

describe('QuaternionElement', function() {
  describe('Inheritance', function() {
    it('is an AlgebraElement', function() {
      element.should.be.instanceOf(AlgebraElement)
    })
  })

  describe('Constructor', function() {
    it('value should default to [1, 0, 0, 0]', function() {
      element.valueOf().should.eql([1, 0, 0, 0])
    })

    it('has signature (number)')
    it('has signature ([number, number])')
    it('has signature ([number, number, number])')
    it('has signature ([number, number, number, number])')
  })
})

