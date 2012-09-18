
var assert = require('assert');
var GLRn = require('../index.js').Real.GeneralLinearGroup;

var GLR2 = new GLRn(2);

var elements = 
  [1, 2, 
  -1, 0];

//var m1 = GL2.Matrix(elements);
var field = GLR2.getField();
console.log(field);
//var m1 = GLR2.Identity();

describe('RealVector', function () {
  it('has an accessor to get a single element', function() {
    assert.equal(1,1);
  });
  it('has the same dim as its vector space', function() {
 //   assert.equal(m1.getOrder(),GL2.getOrder());
  });
});


