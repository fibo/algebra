
var algebra     = require('../../index.js')
  , assert      = require('assert')
  , RealVector  = algebra.Real.Vector
  , RealElement = algebra.Real.Element
  , Rn          = algebra.Real.VectorSpace
  , Vector      = algebra.Vector

var R3 = new Rn(3)
var R4 = new Rn(4)

var x = new RealElement(4)
var y = new RealElement(3)
var z = new RealElement(2)
var w = new RealElement(1)

var zero = new RealElement(0)

var vector = new RealVector({
  elements: [x, y, x, w]
})

describe('RealVector', function () {
  describe('Constructor', function () {

    it('works', function () {
      // Create an R3 vector.
      var arg = {}
      arg.elements = []
      arg.space = R3

      for (var i = 0; i < R3.getDim(); i++) {
        var num = i * i + 1 // elements are 1, 2, 5
        var element = new RealElement(num)
        arg.elements.push(element)
      }

      var vector = new RealVector(arg) // Real 3d vector (1, 2, 5)

      assert.ok(vector instanceof RealVector)
    })

    it('coerces numbers to real elements', function () {
      var arg = {}
      var element0 = new RealElement(5)
      arg.elements = [element0, 1, 4]
      arg.space = R3

      var vector = new RealVector(arg)

      assert.ok(vector instanceof RealVector)
    })
  })

  describe('Inheritance', function () {
    it('is a Vector', function () {
      assert.ok(vector instanceof Vector)
    })
  })
/* TODO da sistemare
  describe('R3 Vector', function () {
    describe('cross()', function () {
      it('implements cross product operator', function () {
        var v1 = new R3.Vector(0, 0, 1)
        var v2 = new R3.Vector(0, 1, 0)

        v1.cross(v2)

        assert.equal(v1.x(0), -1)
        assert.equal(v1.x(1), 0)
        assert.equal(v1.x(2), 0)
      })
    })
  })

  describe('add()', function () {
    it('implements vector addition operation', function () {
      var vector1 = new R3.Vector(1, 2, 3)
      var vector2 = new R3.Vector(1, -1, 1)

      vector1.add(vector2)

      assert.equal(vector1.x(0), 2)
      assert.equal(vector1.x(1), 1)
      assert.equal(vector1.x(2), 4)
    })

    it('can be chained', function () {
      var vector1 = new R3.Vector(1, 1, 1)
      var vector2 = new R3.Vector(2, 2, 2)
      var vector3 = new R3.Vector(4, 4, 4)

      vector1.add(vector2).add(vector3)

      assert.equal(vector1.x(0), 7)
      assert.equal(vector1.x(1), 7)
      assert.equal(vector1.x(2), 7)
    })
  })

  describe('sub()', function () {
    it('implements vector subtraction operation', function () {
      var vector1 = new R3.Vector(1, 2, 3)
      var vector2 = new R3.Vector(1, -1, 1)

      vector1.sub(vector2)

      assert.equal(vector1.x(0), 0)
      assert.equal(vector1.x(1), 3)
      assert.equal(vector1.x(2), 2)
    })

    it('can be chained', function () {
      var vector1 = new R3.Vector(1, 1, 1)
      var vector2 = new R3.Vector(2, 2, 2)
      var vector3 = new R3.Vector(4, 4, 4)

      vector1.sub(vector2).sub(vector3)

      assert.equal(vector1.x(0), -5)
      assert.equal(vector1.x(1), -5)
      assert.equal(vector1.x(2), -5)
    })
  })

  describe('getCoordinates()', function () {
    it('returns an array of numbers', function () {
      var vector = new R3.Vector(1, 2, 3)

      assert.deepEqual(vector.getCoordinates(), [1, 2, 3])
    })
  })

  describe('getCoordinate()', function () {
    it('returns the i-esim coordinate', function () {
      var vector = new R3.Vector(1, 2, 3)
      assert.equal(vector.getCoordinate(0), 1)
      assert.equal(vector.getCoordinate(1), 2)
      assert.equal(vector.getCoordinate(2), 3)
    })
  })

  describe('x()', function () {
    it('is an alias of getCoordinate()', function () {
      assert.ok(v.x === v.getCoordinate)
    })
  })
*/
})

