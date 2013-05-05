
var assert  = require('assert')
  , algebra = require('../index.js')

var abstractMethod = algebra.util.abstractMethod
  , RealElement    = algebra.Real.Element
  , Tensor         = algebra.Tensor
  , Vector         = algebra.Vector

var one  = new RealElement(1)
  , two  = new RealElement(2)
  , zero = new RealElement(0)

var vector = new Vector([one, zero])

describe('Vector', function () {
  describe('Constructor', function () {
    describe('arguments', function () {
      describe('elements', function () {
        it('is required')
      })
    })
  })

  describe('Inheritance', function () {
    it('is a Tensor', function () {
      assert.ok(vector instanceof Tensor)
    })
  })

  describe('Methods', function () {
    describe('clone()', function () {
      it('returns a copy of the object', function () {
        var vector1 = new Vector({elements: [one, zero]})
          , vector2 = vector1.clone()
   
        assert.ok(vector2 instanceof Vector)
        assert.ok(vector1.equal(vector2))
        assert.ok(vector1 !== vector2)
      })
    })

    describe('crossProduct()', function () {
      it('implements the cross product operation')

      it('is implemented only when dim = 3')
    })
   
    describe('cross()', function () {
      it('is an alias of crossProduct()')
    })

    describe('dim()', function () {
      it('is an alias of getDimension()', function () {
        assert.ok(vector.dim === vector.getDimension) 
      })
    })

    describe('dotProduct()', function () {
      it('implements dot product operator', function () {
        var vector1 = new Vector({elements: [zero, zero, one]})
        var vector2 = new Vector({elements: [zero, one, zero]})
   
        var result = vector1.dotProduct(vector2)
   
        assert.ok(result.eq(0))
      })
    })

    describe('dot()', function () {
      it('is an alias of dotProduct()', function () {
        assert.ok(vector.dot === vector.dotProduct) 
      })
    })
   
    describe('element()', function () {
      it('is an alias of getElement()', function () {
        assert.ok(vector.element === vector.getElement) 
      })
    })

    describe('elem()', function () {
      it('is an alias of getElement()', function () {
        assert.ok(vector.elem === vector.getElement) 
      })
    })

    describe('getDimension()', function () {
      it('returns vector dimension', function () {
        var vector1 = new Vector({elements: [one, zero]})
        assert.ok(vector.getDimension(), 2)

        var vector2 = new Vector({elements: [one, zero, two]})
        assert.ok(vector.getDimension(), 3)
      })
    })
   
    describe('getDim()', function () {
      it('is an alias of getDimension()', function () {
        assert.ok(vector.getDim === vector.getDimension) 
      })
    })

    describe('getElement()', function () {
      it('returns element by given index', function () {
        assert.ok(vector.getElement(0).equal(one))
        assert.ok(vector.getElement(1).equal(zero))
      })
    })
   
    describe('getLength()', function () {
      it('returns the norm of the vector')
    })
   
    describe('orthogonal()', function () {
      it('returns true if two vectors are orthogonal, false otherwise', function () {
        var vector1 = new Vector({elements: [one, zero, one]})
        var vector2 = new Vector({elements: [zero, one, zero]})
        var vector3 = new Vector({elements: [one, one, one]})
   
        assert.ok(vector1.orthogonal(vector2))
       // assert.equal(vector1.orthogonal(vector3), false)
      })
    })

    describe('ortho()', function () {
      it('is an alias of orthogonal()', function () {
        assert.ok(vector.ortho === vector.orthogonal) 
      })
    })
   
    describe('r4c()', function () {
      it('implements rows for columns right multiplication by a matrix')
    })

    describe('scalarMultiplication()', function () {
      it('implements multiplication by a scalar', function () {
        var vector = new Vector({elements: [one, zero, one]})
   
        vector.scalar(two)
   
        assert.ok(vector.getElement(0).eq(two))
        assert.ok(vector.getElement(1).eq(zero))
        assert.ok(vector.getElement(2).eq(two))
      })
   
      it('can be chained', function () {
        var vector = new Vector({elements: [one, zero, one]})
   
        vector.scalar(two)
   
        vector.scalar(2).scalar(4)
   
        assert.ok(vector.getElement(0).eq(16))
        assert.ok(vector.getElement(1).eq(zero))
        assert.ok(vector.getElement(2).eq(16))
      })
    })

    describe('scalar()', function () {
      it('is an alias of scalarMultiplication()', function () {
        assert.ok(vector.scalar === vector.scalarMultiplication) 
      })
    })
  })
})

