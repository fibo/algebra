
var assert  = require('assert')
  , algebra = require('../index.js')

var abstractMethod = algebra.util.abstractMethod
  , RealElement    = algebra.Real.Element
  , Tensor         = algebra.Tensor

var one  = new RealElement(1)
  , zero = new RealElement(0)

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

      describe('elementConstructor', function () {
        it('defaults to first element constructor', function () {
          var tensor = new Tensor({
            elements: [one, zero],
            indices : [2]
          })
          assert.ok(tensor.getElementConstructor() === one.constructor)
        })
      })
    })
  })

  describe('Methods', function () {
    describe('addition()', function () {
      it('implements the addition operator')
      it('checks indices are the same')
    })

    describe('add()', function () {
      it('is an alias of addition()', function () {
        assert.ok(tensor.add === tensor.addition) 
      })
    })

    describe('clone()', function () {
      it('returns a copy of the object', function () {
        var tensor1 = new Tensor({
          indices: [2, 2],
          elements: [one, zero, one, zero]
        })
          , tensor2 = tensor1.clone()

        assert.ok(tensor2 instanceof Tensor)
        assert.ok(tensor1.equal(tensor1))
        assert.ok(tensor1 !== tensor2)
      })
    })
   
    describe('equal()', function () {
      it('returns true if two tensors are equal, false otherwise', function () {
        var tensor1 = new Tensor({
              indices: [2, 2],
              elements: [one, zero, one, zero]
            })
          , tensor2 = new Tensor({
              indices: [2, 2],
              elements: [one, zero, one, zero]
            })

        assert.ok(tensor1.equal(tensor2))
        assert.ok(tensor2.equal(tensor1))

        assert.equal(tensor1.equal(tensor), false)
      })

      it('has reflection property', function () {
        assert.ok(tensor.equal(tensor)) 
      })
    })

    describe('eq()', function () {
      it('is an alias of equal()', function () {
        assert.ok(tensor.eq === tensor.equal) 
      })
    })

    describe('getData()', function () {
      it('returns an array of elements data')
    })

    describe('getElementConstructor()', function () {
      it('returns elementConstructor', function () {
        assert.ok(tensor.getElementConstructor() === RealElement)
      })

      it('is the constructor of the first element')
    })

    describe('getElements()', function () {
      it('returns the elements', function () {
        assert.deepEqual(tensor.getElements(), [one])
      })
    })

    describe('getIndices()', function () {
      it('returns tensor indices', function () {
        var indices = [1, 2]
        var tensor = new Tensor({
          elements: [one, zero, one],
          indices : indices
        })
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

    describe('ne()', function () {
      it('is an alias of notEqual()', function () {
        assert.ok(tensor.ne === tensor.notEqual) 
      })
    })

    describe('notEqual()', function () {
      it('returns true if two tensors are not equal, false otherwise'/*, function () {
      }*/)
    })

    describe('setElements()', function () {
      it('set the elements')
    })

    describe('subtraction()', function () {
      it('implements subtraction operator')
      it('checks indices are the same')
    })

    describe('sub()', function () {
      it('is an alias of subtraction()', function () {
        assert.ok(tensor.sub === tensor.subtraction) 
      })
    })
  })
})


