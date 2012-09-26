
var assert = require('assert');
var algebra = require('../index.js');
var GLRn = algebra.Real.GeneralLinearGroup;
var RealField = require('../index.js').Real.Field;
var SquareMatrix = require('../index.js').SquareMatrix;

var GLR2 = new GLRn(2);

var elements = 
  [1, 2, 
  -1, 0];

//var m1 = GL2.Matrix(elements);
var field = GLR2.getField();
//var id = GLR2.Identity();
var id = new GLR2.Identity;

describe('RealGeneralLinearGroup', function () {
  it('uses the Real field', function() {
    assert.ok(field instanceof RealField);
  });
  it('has as an order', function() {
    assert.equal(GLR2.getOrder(), 2);
  });
  it('has as dim = order * order', function() {
    //assert.equal(GLR2.getDim(), 4);
  });
  describe('Identity matrix', function () {
    assert.equal(id.getOrder(), 2);
    assert.deepEqual(id.getElements(), [1, 0, 0, 1]);
  });
});

