
var assert = require('assert');
var algebra = require('../../index.js');

var GeneralLinearGroup = algebra.GeneralLinearGroup;
var GLRn               = algebra.Real.GeneralLinearGroup;
var RealField          = algebra.Real.Field;

describe('RealGeneralLinearGroup', function () {
  describe('constructor', function () {
    it('accepts 1 argument', function() {
      var GLR2 = new GLRn(2);
      assert.ok(GLR2 instanceof GeneralLinearGroup);
    });
  });

  describe('inherits', function () {
    it('from GeneralLinearGroup', function() {
      var GLR3 = new GLRn(3);
      assert.ok(GLR3 instanceof GeneralLinearGroup);
    });
  });

  it('uses the Real field', function() {
    var GLR2 = new GLRn(2);
    var field = GLR2.getField();
    assert.ok(field instanceof RealField);
  });
});


