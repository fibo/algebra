
var assert = require('assert');
var Complex = require('../index.js').Complex.Element;
var ComplexField = require('../index.js').Complex.Field;

var C = new ComplexField();

describe('ComplexField', function () {
  it('has a zero and a one element', function() {
    var one = new Complex(1);
    one.mul(one);
    assert.equal(one.re(), 1);
    assert.equal(one.im(), 0);

    var zero = new Complex(0);
    zero.mul(one);
    assert.equal(zero.re(), 0);
    assert.equal(zero.im(), 0);
  });
  it('defines + * - / operations', function() {
  });
});

