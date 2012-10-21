
var assert = require('assert');
var algebra = require('../../index.js');

var Vector = algebra.Vector;
var RealVector = algebra.Real.Vector;
var Real = algebra.Real.Element;
var Rn = algebra.Real.VectorSpace;

var R3 = new Rn(3);

describe('RealVector', function () {
  describe('constructor', function () {
    it('', function() {
    });
  });

  describe('inherits', function () {
    it('from Vector', function() {
      //var v = new R3.Vector();
      //assert.ok(v instanceof Vector);
    });
  });

  // TODO uniforma tutti i test che controllano la funzione clone().
  describe('clone()', function () {
    it('...', function() {
    });
  });

  describe('x(<Integer>', function () {
    it('returns the i-esim coordinate', function() {
      var vector = new R3.Vector(1, 2, 3);
      assert.equal(vector.x(0), 1);
      assert.equal(vector.x(1), 2);
      assert.equal(vector.x(2), 3);
    });
  });

  describe('getElements()', function () {
    it('returns the vector elements', function() {
      var zero = new Real(0);
      var vector = new R3.Vector(zero, 1, 2);
      var elements = vector.getElements();
      assert.equal(elements[0].num(), 0);
      assert.equal(elements[1].num(), 1);
      assert.equal(elements[2].num(), 2);
    });
  });

  describe('getElement()', function () {
    it('returns the vector elements', function() {
      var zero = new Real(0);
      var vector = new R3.Vector(zero, 1, 2);
      var element = vector.getElement(0);
      assert.equal(element.num(), 0);
    });
  });

  describe('scalar(<Real>)', function () {
    it('implements multiplication by a scalar', function() {
      var vector = new R3.Vector(1, 1, 1);

      vector.scalar(2);

      assert.equal(vector.x(0), 2);
      assert.equal(vector.x(1), 2);
      assert.equal(vector.x(2), 2);
    });
  });

  describe('dot(<Vector>)', function () {
    it('implements dot product operator', function() {

    });
  });

  describe('R3 Vector', function () {
    describe('cross(<Vector>)', function () {
      it('implements cross product operator', function() {
        var v1 = new R3.Vector(0, 0, 1);
        var v2 = new R3.Vector(0, 1, 0);

        v1.cross(v2);

        //assert.equal(v1.x(0), -1);
        //assert.equal(v1.x(1), 0);
        //assert.equal(v1.x(2), 0);
      });
    });
  });
});


