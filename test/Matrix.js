
var assert = require('assert');
var algebra = require('../index.js');

var Matrix       = algebra.Matrix;
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

describe('Matrix', function () {
  describe('constructor', function () {
    it('requires: numRows, numCols, order', function() {
      var m = new Matrix({
        numRows: 2,
        numCols: 3,
        field: R
      });
      assert.ok(m instanceof Matrix);
    });

    it('elements arg defaults to field.getZero()', function() {
      /*
      var m = new Matrix({
        numCols: 2,
        numRows: 2,
        field: C,
        elements: [z1, z2]
      });
      */
    });
  });

  describe('inherits', function () {
    it('', function() {
    });
  });

  describe('ij()', function () {
    it('returns the i,j-elem', function() {
      assert.equal(m1.ij(0, 0), elements1[0]);
      assert.equal(m1.ij(0, 1), elements1[1]);
      assert.equal(m1.ij(0, 2), elements1[2]);
      assert.equal(m1.ij(1, 0), elements1[3]);
      assert.equal(m1.ij(1, 1), elements1[4]);
      assert.equal(m1.ij(1, 2), elements1[5]);
    });
  });

  describe('row()', function () {
    it('returns the i-th row', function() {
      assert.deepEqual(m1.row(0), [1, 0, 2]);
      assert.deepEqual(m1.row(1), [-5, -1, 6]);
    });
  });

  describe('col()', function () {
    it('returns the j-th column', function() {
      assert.deepEqual(m1.col(0), [1, -5]);
      assert.deepEqual(m1.col(1), [0, -1]);
      assert.deepEqual(m1.col(2), [2, 6]);
    });
  });

  describe('getElements()', function () {
    it('returns the elements', function() {
    });

    it('has an elems() alias', function() {
      assert.ok(m1.getElements === m1.elems);
    });
  });

  describe('transpose()', function () {
    var elements1 = [1, 2, 3, 4, -1, -2, -3, -4];
    var m1 = new Matrix({
      numRows: 2,
      numCols: 4,
      field: R,
      elements: elements1
    });

    var m2 = m1.clone();
    m2.transpose();

    // TODO si dice involutive in inglese?
    // voglio dire che e' un involuzione cioe che se la applico due
    // volte torno all' elemento di partenza.
    it('is involutive', function() {
      assert.deepEqual(m1.tr().tr().elems(), elements1);
    });

    it('swaps the i,j-th element with the i,j-th one', function() {
      //assert.equal(m1.ij(0, 1), m2.ij(1, 0));
      //assert.equal(m1.ij(0, 2), m2.ij(3, 0));
      //assert.equal(m1.ij(0, 3), m2.ij(4, 0));
      //assert.equal(m1.ij(1, 0), m2.ij(0, 1));
      // ...
    });

    it('swaps the i,j-th element with the i,j-th one', function() {
      assert.equal(m1.getNumCols(), m2.getNumRows());
      assert.equal(m1.getNumRows(), m2.getNumCols());
    });

    it('has a tr() alias', function() {
      assert.ok(m1.transpose === m1.tr);
    });
  });

  describe('getNumCols()', function () {
    it('returns the number of cols', function() {
      assert.equal(m1.getNumCols(), 3);
    });
  });

  describe('getNumRows()', function () {
    it('returns the number of rows', function() {
      assert.equal(m1.getNumRows(), 2);
    });
  });

  describe('...()', function () {
    it('...', function() {
    });
  });
});


