
var algebra = require('../index')
  , should  = require('should')

var AlgebraElement = algebra.AlgebraElement
  , AlgebraField = algebra.AlgebraField
  , RealElement = algebra.RealElement

var C = algebra.C
  , R = algebra.R

var data, element, element1, element2, field

describe('AlgebraElement', function() {
  describe('Constructor', function() {
    it('has signature (field, data)', function() {
      field = R
      data = 1
      element = new AlgebraElement(field, data)

      element.should.be.instanceOf(AlgebraElement)
    })

    it('has signature (field)', function() {
      field = C
      element = new AlgebraElement(field)

      element.should.be.instanceOf(AlgebraElement)
    })

    it('checks *field* is an AlgebraField', function() {
      ;(function() {
        element = new AlgebraElement('not a field')
      }).should.throwError()
    })

    it('defaults *data* to field.one', function() {
      field = R
      element = new AlgebraElement(field)
      element.data.should.eql(field.one)

      field = C
      element = new AlgebraElement(field)
      element.data.should.eql(field.one)
    })
  })

  describe('data', function() {
    it('returns element data', function() {
      field = R
      data = 6
      element = new AlgebraElement(field, data)

      element.data.should.eql(data)
    })
  })

  describe('field', function() {
    it('returns element field', function() {
      field = R
      data = 5
      element = new AlgebraElement(field, data)

      element.field.should.eql(field)
    })
  })

  describe('clone()', function() {
    it('returns an element with the same data', function() {
      data = 10
      element1 = new RealElement(data)
      element2 = element1.clone()
      element2.should.be.instanceOf(RealElement)

      element1.data.should.be.eql(element2.data)
    })
  })

  describe('addition()', function() {
    it('is abstract', function() {
      element.addition.should.throwError()
    })
  })
})
