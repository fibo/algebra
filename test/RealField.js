
var assert = require('assert');
var RealField = require('../index.js').Real.Field;

var R = new RealField();

describe('RealField', function () {
  it('has a zero and a one element', function() {
    assert.equal(R.getZero(),0);
    assert.equal(R.getOne(),1);
  });
  it('defines + * - / operations', function() {
    var a = -1, b = 4, c;

    c = R.addition(a, b);
    assert.equal(c, a + b);

    c = R.multiplication(a, b);
    assert.equal(c, a * b);

    c = R.subtraction(a, b);
    assert.equal(c, a - b);

    c = R.division(a, b);
    assert.equal(c, a / b);
  });
});

