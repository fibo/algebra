
var algebra = require('../../index.js')
  , assert  = require('assert')

var is = algebra.util.is
var Element = algebra.Element

var element0 = new Element(0)
var element1 = new Element(1)

describe('util.is', function () {
  describe('array', function () {
    it('return true if argument is a array', function () {
      assert.ok(is.array([4, 5]))
    })
  })

  describe('arrayOfElements', function () {
    it('return true if argument is an array of Elements', function () {
      var elements = [element0, element1]
      assert.ok(is.arrayOfElements(elements))
    })
  })

  describe('elementWithNumberDataType', function () {
    it('return true if argument looks like an Element and has data of type number', function () {
      // Create a fake Element.
      var fakeElement = {
        getData: function() {
          return 1
        }
      }

      assert.ok(is.elementWithNumberDataType(fakeElement))
    })
  })

  describe('integer', function () {
    it('return true if argument is an integer, false otherwise', function () {
      assert.ok(is.integer(4))
      assert.ok(is.integer(0))
      assert.ok(is.integer(-1))

      assert.equal(is.integer(1.7), false)
      assert.equal(is.integer(-10.5), false)
      assert.equal(is.integer('xx'), false)
    })
  })

  describe('number', function () {
    it('return true if argument is a number', function () {
      assert.ok(is.number(4))
      assert.ok(is.number(0.1))
      assert.ok(is.number(1.8))

      assert.equal(is.integer(1.7), false)
      assert.equal(is.integer(-10.5), false)
      assert.equal(is.integer('xx'), false)
    })
  })

  describe('notInteger', function () {
    it('return true if argument is not an integer, false otherwise', function () {
      assert.ok(is.notInteger(4.2))
      assert.ok(is.notInteger(0.1))
      assert.ok(is.notInteger(-1.8))

      assert.equal(is.notInteger(1), false)
      assert.equal(is.notInteger(-10), false)
      assert.equal(is.notInteger(0), false)
    })
  })

  describe('notNumber', function () {
    it('return true if argument is a not number', function () {
      assert.ok(is.notNumber({}))
      assert.ok(is.notNumber([4]))
    })
  })

  describe('notPositiveInteger', function () {
    it('return true if argument is a positive integer, false otherwise', function () {
      assert.ok(is.notPositiveInteger(-4))
      assert.ok(is.notPositiveInteger(-1))
      assert.ok(is.notPositiveInteger(1.1))

      assert.equal(is.notPositiveInteger(1), false)
      assert.equal(is.notPositiveInteger(10), false)
      assert.equal(is.notPositiveInteger(5), false)
    })
  })

  describe('positiveInteger', function () {
    it('return true if argument is a positive integer, false otherwise', function () {
      assert.ok(is.positiveInteger(4))
      assert.ok(is.positiveInteger(1))
      assert.ok(is.positiveInteger(100))

      assert.equal(is.positiveInteger(1.7), false)
      assert.equal(is.positiveInteger(-10), false)
      assert.equal(is.positiveInteger(-5), false)
    })
  })

  describe('undef', function () {
    it('return true if argument is undefined', function () {
      assert.ok(is.undef(undefined))
    })
  })
})

