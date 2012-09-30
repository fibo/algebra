
var assert = require('assert');
var algebra = require('../index.js');

var Complex      = algebra.Complex.Element;
var ComplexField = algebra.Complex.Field;

var C = new ComplexField();

describe('ComplexField', function () {
  describe('constructor', function () {
    it('requires: ..., ...', function() {
      //assert.ok(... instanceof ...);
    });
  });

  describe('inherits', function () {
    it('from ...', function() {
    });
  });

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

