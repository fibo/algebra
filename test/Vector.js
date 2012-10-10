
var assert = require('assert');
var algebra = require('../index.js');

var VectorSpace       = algebra.VectorSpace;
var RealField    = algebra.Real.Field;
var ComplexField = algebra.Complex.Field;

var C = new ComplexField();
var R = new RealField();

var elements1 = [1, 0, 2, -5, -1, 6];
var m1 = new Matrix({
  numRows: 2,
  numCols: 3,
  field: R,
  elements: elements1
});

describe('Vector', function () {
  describe('constructor', function () {
    it('requires: space', function() {
      //assert.ok(v instanceof Vector);
    });

    it('elements arg defaults to field.getZero()', function() {
    });
  });

  // TODO togli i test inherit dalle funzioni che non ereditano
  describe('inherits', function () {
    it('', function() {
    });
  });

  describe('cross(<Vector>)', function () {
    it('implements the cross production operation', function() {
    });
  });

  describe('dot(<Vector>)', function () {
    it('implements the dot product operation', function() {
    });
  });

  describe('scalar(<Element>)', function () {
    it('implements per scalar multiplication', function() {
    });
  });

  describe('getLength()', function () {
    it('returns the norm of the vector', function() {
    });
  });

  describe('getDim()', function () {
    it('returns vector dimension', function() {
    });
  });

  describe('r4c(<Matrix>)', function () {
    it('implements rows for columns right multiplication by a matrix', function() {
    });
  });

  describe('...()', function () {
    it('...', function() {
    });
  });
});



