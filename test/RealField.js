
var assert = require('assert');
var RealField = require('../index.js').Real.Field;

var R = new RealField();

describe('RealField', function () {
  it('has a zero and a one element', function() {
    assert.equal(R.getZero(),0);
    assert.equal(R.getOne(),1);
  });
  it('has dim = 1', function() {
    //assert.equal(v1.getDim(),R2.getDim());
  });
});


