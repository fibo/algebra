
var assert = require('assert');
var algebra = require('../index.js');

var Matrix       = algebra.Matrix;
var RealField    = algebra.Real.Field;
var ComplexField = algebra.Complex.Field;
var SquareMatrix = algebra.SquareMatrix;

describe('SquareMatrix', function () {
  describe('constructor', function () {
    it('requires: field, order', function() {
      var R = new RealField();
      var m = new SquareMatrix({order: 4, field: R});
      assert.ok(m instanceof SquareMatrix);
    });
  });

  describe('inherits', function () {
    it('from Matrix', function() {
      var C = new ComplexField();
      var m = new SquareMatrix({order: 2, field: C});
      assert.ok(m instanceof Matrix);
    });
  });
});

