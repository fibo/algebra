
var assert  = require('assert')
  , algebra = require('../index.js')

var abstractMethod = algebra.util.abstractMethod
  , RealElement    = algebra.Real.Element
  , Tensor         = algebra.Tensor

var one = new RealElement(1)

var tensor = new Tensor({
  elements: [one]
})

describe('Tensor', function () {
  describe('Constructor', function () {
    describe('arguments', function () {
      describe('indices', function () {
        it('defaults to [0]', function () {
          assert.deepEqual(tensor.getIndices(), [0])
        })
      })
    })
  })

  describe('Methods', function () {
    describe('addition()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.addition === abstractMethod)
      })
    })

    describe('clone()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.clone === abstractMethod)
      })
    })
   
    describe('equals()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.equals === abstractMethod)
      })
    })

    describe('getData()', function () {
      it('returns an array of elements data')
    })

    describe('getElementConstructor()', function () {
      it('returns elementConstructor', function () {
        var tensor = new Tensor({
          elementConstructor: RealElement
        })

        assert.ok(tensor.getElementConstructor() === RealElement)
      })
    })

    describe('getElements()', function () {
      it('returns the elements', function () {
        assert.deepEqual(tensor.getElements(), [one])
      })
    })

    describe('getIndices()', function () {
      it('returns tensor indices', function () {
        var indices = [1, 4, 6]
        var tensor = new Tensor({indices: indices})
        assert.deepEqual(tensor.getIndices(), indices)
      })
    })

    describe('inversion()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.inversion === abstractMethod)
      })
    })

    describe('multiplication()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.multiplication === abstractMethod)
      })
    })

    describe('notEquals()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.notEquals === abstractMethod)
      })
    })

    describe('setElements()', function () {
      it('set the elements')
    })

    describe('subtraction()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.subtraction === abstractMethod)
      })
    })
  })
})


