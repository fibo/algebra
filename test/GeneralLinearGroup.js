
var assert = require('assert');
var algebra = require('../index.js');

var GeneralLinearGroup = algebra.GeneralLinearGroup;
var MatrixRing         = algebra.MatrixRing;
var RealField          = algebra.Real.Field;

describe('GeneralLinearGroup', function () {
  describe('constructor', function () {
    it('requires: field, order', function () {
      var R = new RealField();
      var GLR2 = new GeneralLinearGroup({order: 2, field: R});
      assert.ok(GLR2 instanceof GeneralLinearGroup);
    });
  });

  describe('inherits', function () {
    it('from MatrixRing', function () {
      //var R = new RealField();
      //var GLR2 = new GeneralLinearGroup({order: 2, field: R});
      //assert.ok(GLR2 instanceof MatrixRing);
    });
  });

  describe('...()', function () {
    it('...', function() {
    });
  });
});

