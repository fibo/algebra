
var assert = require('assert');
var RealVectorSpace = require('../index.js').Real.VectorSpace;

var R2 = new RealVectorSpace(2);

var a = 1;
var b = 2;
var v1 = R2.Vector(a,b);

describe('RealVector', function () {
  it('has an accessor to get a single element', function() {
    assert.equal(v1.x(0),a);
    assert.equal(v1.x(1),b);
  });
  it('has the same dim as its vector space', function() {
    assert.equal(v1.getDim(),R2.getDim());
  });
});

