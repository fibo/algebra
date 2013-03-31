
var assert = require('assert');
var algebra = require('../../index.js');

var RealVector  = algebra.Real.Vector;
var RealElement = algebra.Real.Element;
var Rn          = algebra.Real.VectorSpace;
var Vector      = algebra.Vector;

var R3 = new Rn(3);
var R4 = new Rn(4);

var x = new RealElement(4);
var y = new RealElement(3);
var z = new RealElement(2);
var w = new RealElement(1);

var zero = new RealElement(0);

var v = new RealVector({
  space: R4,
  elements: [x, y, x, w]
});

describe('RealVector', function () {
  describe('Constructor', function () {

    it('works', function () {
      // Create an R3 vector.
      var arg = {};
      arg.elements = [];
      arg.space = R3;

      for (var i = 0; i < R3.getDim(); i++) {
        var num = i * i + 1; // elements are 1, 2, 5.
        var element = new RealElement(num);
        arg.elements.push(element);
      }

      var vector = new RealVector(arg); // Real 3d vector (1, 2, 5).

      assert.ok(vector instanceof RealVector);

    });

    it('coerces elements', function () {

      var arg = {};
      var element0 = new RealElement(5);
      arg.elements = [element0, 1, 4];
      arg.space = R3;

      var vector = new RealVector(arg);

      assert.ok(vector instanceof RealVector);

    });
  });

  describe('Inheritance', function () {
    it('is a Vector', function () {
      assert.ok(v instanceof Vector);
    });
  });

  describe('getElements()', function () {
    it('returns the vector elements', function () {
      var vector = new R3.Vector(zero, 1, 2);
      var elements = vector.getElements();
      assert.equal(elements[0].num(), 0);
      assert.equal(elements[1].num(), 1);
      assert.equal(elements[2].num(), 2);
    });
  });

  describe('getElement()', function () {
    it('returns the vector elements', function () {
      var vector = new R3.Vector(zero, 1, 2);
      var element = vector.getElement(0);
      assert.equal(element.num(), 0);
    });
  });

  describe('scalar()', function () {
    it('implements multiplication by a scalar', function () {
      var vector = new R3.Vector(1, 1, 1);

      var two = new RealElement(2);
      vector.scalar(two);

      assert.equal(vector.x(0), 2);
      assert.equal(vector.x(1), 2);
      assert.equal(vector.x(2), 2);
    });

    it('coerces number type', function () {
      var vector = new R3.Vector(1, 1, 1);

      vector.scalar(2);

      assert.equal(vector.x(0), 2);
      assert.equal(vector.x(1), 2);
      assert.equal(vector.x(2), 2);
    });

    it('can be chained', function () {
      var vector = new R3.Vector(1, 1, 1);

      vector.scalar(2).scalar(4);

      assert.equal(vector.x(0), 8);
      assert.equal(vector.x(1), 8);
      assert.equal(vector.x(2), 8);
    });
  });

  describe('dot()', function () {
    it('implements dot product operator', function () {
        var v1 = new R3.Vector(0, 0, 1);
        var v2 = new R3.Vector(0, 1, 0);

        var zero = v1.dot(v2);

        assert.equal(zero.num(), 0);
    });
  });

  describe('R3 Vector', function () {
    describe('cross()', function () {
      it('implements cross product operator', function () {
        var v1 = new R3.Vector(0, 0, 1);
        var v2 = new R3.Vector(0, 1, 0);

        v1.cross(v2);

        assert.equal(v1.x(0), -1);
        assert.equal(v1.x(1), 0);
        assert.equal(v1.x(2), 0);
      });
    });
  });

  describe('add()', function () {
    it('implements vector addition operation', function () {
      var vector1 = new R3.Vector(1, 2, 3);
      var vector2 = new R3.Vector(1, -1, 1);

      vector1.add(vector2);

      assert.equal(vector1.x(0), 2);
      assert.equal(vector1.x(1), 1);
      assert.equal(vector1.x(2), 4);
    });

    it('can be chained', function () {
      var vector1 = new R3.Vector(1, 1, 1);
      var vector2 = new R3.Vector(2, 2, 2);
      var vector3 = new R3.Vector(4, 4, 4);

      vector1.add(vector2).add(vector3);

      assert.equal(vector1.x(0), 7);
      assert.equal(vector1.x(1), 7);
      assert.equal(vector1.x(2), 7);
    });
  });

  describe('sub()', function () {
    it('implements vector subtraction operation', function () {
      var vector1 = new R3.Vector(1, 2, 3);
      var vector2 = new R3.Vector(1, -1, 1);

      vector1.sub(vector2);

      assert.equal(vector1.x(0), 0);
      assert.equal(vector1.x(1), 3);
      assert.equal(vector1.x(2), 2);
    });

    it('can be chained', function () {
      var vector1 = new R3.Vector(1, 1, 1);
      var vector2 = new R3.Vector(2, 2, 2);
      var vector3 = new R3.Vector(4, 4, 4);

      vector1.sub(vector2).sub(vector3);

      assert.equal(vector1.x(0), -5);
      assert.equal(vector1.x(1), -5);
      assert.equal(vector1.x(2), -5);
    });
  });

  describe('ortho()', function () {
    it('returns true if two vectors are orthogonal', function () {
      var vector1 = new R3.Vector(1, 0, 1);
      var vector2 = new R3.Vector(0, 1, 0);

      assert.ok(vector1.ortho(vector2));
    });
  });

  describe('r4c()', function () {
    it('implements right multiplication by matrix', function () {
    });
  });

  describe('getCoordinates()', function () {
    it('returns an array of numbers', function () {
      var vector = new R3.Vector(1, 2, 3);

      assert.deepEqual(vector.getCoordinates(), [1, 2, 3]);
    });
  });

  describe('getCoordinate()', function () {
    it('returns the i-esim coordinate', function () {
      var vector = new R3.Vector(1, 2, 3);
      assert.equal(vector.getCoordinate(0), 1);
      assert.equal(vector.getCoordinate(1), 2);
      assert.equal(vector.getCoordinate(2), 3);
    });
  });

  describe('x()', function () {
    it('is an alias of getCoordinate()', function () {
      assert.ok(v.x === v.getCoordinate);
    });
  });
});

