
var assert  = require('assert')
  , algebra = require('../index.js')

var abstractMethod = algebra.util.abstractMethod
  , Element        = algebra.Element

var element = new Element()

describe('Element', function () {
  describe('Constructor', function () {
  })

  describe('Methods', function () {
    describe('addition()', function () {
      it('is an abstract method', function () {
        assert.ok(element.addition === abstractMethod)
      })
    })

    describe('clone()', function () {
      it('is an abstract method', function () {
        assert.ok(element.clone === abstractMethod)
      })
    })

    describe('division()', function () {
      it('is an abstract method', function () {
        assert.ok(element.division === abstractMethod)
      })
    })

    describe('equal()', function () {
      it('is an abstract method', function () {
        assert.ok(element.equal === abstractMethod)
      })
    })

    describe('getData()', function () {
      it('returns element data', function () {
        var element = new Element({data:'data'})
        assert.equal(element.getData(), 'data')
      })
    })

    describe('inversion()', function () {
      it('is an abstract method', function () {
        assert.ok(element.inversion === abstractMethod)
      })
    })

    describe('isNotOne()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isNotOne === abstractMethod)
      })
    })

    describe('isNotZero()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isNotZero === abstractMethod)
      })
    })
   
    describe('isOne()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isOne === abstractMethod)
      })
    })

    describe('isZero()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isZero === abstractMethod)
      })
    })
   
    describe('multiplication()', function () {
      it('is an abstract method', function () {
        assert.ok(element.multiplication === abstractMethod)
      })
    })

    describe('notEquals()', function () {
      it('is an abstract method', function () {
        assert.ok(element.notEquals === abstractMethod)
      })
    })

    describe('setData()', function () {
      it('set element data', function () {
        var element = new Element()
        element.setData(12)
        assert.equal(element.getData(), 12)
      })
    })

    describe('subtraction()', function () {
      it('is an abstract method', function () {
        assert.ok(element.subtraction === abstractMethod)
      })
    })
  })
})

