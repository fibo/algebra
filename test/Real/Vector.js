
var assert = require('assert');
var algebra = require('../../index.js');

var Vector = algebra.Vector;
var RealVector = algebra.Real.Vector;
var Real = algebra.Real.Element;
var Rn = algebra.Real.VectorSpace;

var R3 = new Rn(3);
var R4 = new Rn(4);

var x = new Real(4);
var y = new Real(3);
var z = new Real(2);
var w = new Real(1);

var v = new RealVector({
  space: R4,
  elements: [x, y, x, w]
});

describe('RealVector', function () {
  describe('constructor:', function () {
    it('works', function () {
      var arg = {};
      arg.elements = [];
      arg.space = R3;

      for (var i = 0; i < R3.getDim(); i++) {
        var num = i * i + 1; // elements are 1, 2, 5.
        var element = new Real(num);
        arg.elements.push(element);
      }

      var vector = new RealVector(arg); // Real 3d vector (1, 2, 5).

      assert.ok(vector instanceof RealVector);
    });
  });

  describe('inheritance:', function () {
    it('from Vector', function () {
      assert.ok(v instanceof Vector);
    });
  });

  // TODO uniforma tutti i test che controllano la funzione clone().
  describe('clone()', function () {
    it('...', function () {
    });
  });

  describe('eq(<Vector>)', function () {
    it('...', function () {
    });
  });

  describe('getElements()', function () {
    it('returns the vector elements', function () {
      var zero = new Real(0);
      var vector = new R3.Vector(zero, 1, 2);
      var elements = vector.getElements();
      assert.equal(elements[0].num(), 0);
      assert.equal(elements[1].num(), 1);
      assert.equal(elements[2].num(), 2);
    });
  });

  describe('getElement()', function () {
    it('returns the vector elements', function () {
      var zero = new Real(0);
      var vector = new R3.Vector(zero, 1, 2);
      var element = vector.getElement(0);
      assert.equal(element.num(), 0);
    });
  });

  describe('scalar(<number|Real>)', function () {
    it('implements multiplication by a scalar', function () {
      var vector = new R3.Vector(1, 1, 1);

      var two = new Real(2);
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

  describe('dot(<Vector>)', function () {
    it('implements dot product operator', function () {
        var v1 = new R3.Vector(0, 0, 1);
        var v2 = new R3.Vector(0, 1, 0);

        var zero = v1.dot(v2);

        assert.equal(zero.num(), 0);
    });
  });

  describe('R3 Vector', function () {
    describe('cross(<Vector>)', function () {
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

  describe('add(<Vector>)', function () {
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

  describe('sub(<Vector>)', function () {
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

  describe('ortho(<Vector>)', function () {
    it('returns true if two vectors are orthogonal', function () {
      var vector1 = new R3.Vector(1, 0, 1);
      var vector2 = new R3.Vector(0, 1, 0);

      assert.ok(vector1.ortho(vector2));
    });
  });

  describe('r4c(<Matrix>)', function () {
    it('implements right multiplication by matrix', function () {
    });
  });

  describe('getCoordinates()', function () {
    it('returns an array of numbers', function () {
      var vector = new R3.Vector(1, 2, 3);

      assert.deepEqual(vector.getCoordinates(), [1, 2, 3]);
    });
  });

  describe('getCoordinate(<Integer>)', function () {
    it('returns the i-esim coordinate', function () {
      var vector = new R3.Vector(1, 2, 3);
      assert.equal(vector.getCoordinate(0), 1);
      assert.equal(vector.getCoordinate(1), 2);
      assert.equal(vector.getCoordinate(2), 3);
    });
  });

  describe('x(<Integer>)', function () {
    it('is an alias of getCoordinate(<Integer>)', function () {
      assert.ok(v.x === v.getCoordinate);
    });
  });
});

