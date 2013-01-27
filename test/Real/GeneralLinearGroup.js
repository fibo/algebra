
var assert = require('assert');
var algebra = require('../../index.js');

var GLnR             = algebra.Real.GeneralLinearGroup;
var RealSquareMatrix = algebra.Real.SquareMatrix;

var GL2 = new GLnR(2);

describe('RealGeneralLinearGroup', function () {
  describe('constructor:', function () {
    it('', function () {
    });

  });

  describe('Matrix', function () {
    it('is a RealSquareMatrix constructor', function () {
      var m2 = new GL2.Matrix(1, 2, 3, 4);

      assert.ok(m2 instanceof RealSquareMatrix);
    });

    it('throws Error', function () {
      assert.throws(function () { new GL2.Matrix(1, 1, 2, 2); }, Error);
    });

    it('defaults to Indentity', function () {
	    /*
	     * TODO
      var arg = {};
      arg.order = 2;

      var identity = new GL2.Matrix();

      var elements = identity.getElements();
      assert.ok(elements[0].isOne());
      assert.ok(elements[1].isZero());
      assert.ok(elements[2].isZero());
      assert.ok(elements[3].isOne());
      */
    });
  });
});

