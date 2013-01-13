
var assert = require('assert');
var algebra = require('../index.js');

var ComplexField = algebra.Complex.Field;
var RealField    = algebra.Real.Field;
var VectorSpace  = algebra.VectorSpace;

var C = new ComplexField();
var R = new RealField();

describe('Vector', function () {
  describe('constructor:', function () {
    it('requires: space', function() {
      //assert.ok(v instanceof Vector);
    });

    it('elements arg defaults to field.getZero()', function () {
    });
  });

  describe('cross(<Vector>)', function () {
    it('implements the cross product operation', function () {
    });
  });

  describe('dot(<Vector>)', function () {
    it('implements the dot product operation', function () {
    });
  });

  describe('scalar(<Element>)', function () {
    it('implements multiplication by scalar', function () {
    });
  });

  describe('getLength()', function () {
    it('returns the norm of the vector', function () {
    });
  });

  describe('getDim()', function () {
    it('returns vector dimension', function () {
    });
  });

  describe('r4c(<Matrix>)', function () {
    it('implements rows for columns right multiplication by a matrix', function () {
    });
  });
});

