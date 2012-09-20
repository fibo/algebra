
var assert = require('assert');
var Complex = require('../index.js').Complex.Element;
var ComplexField = require('../index.js').Complex.Field;

var C = new ComplexField();

describe('ComplexElement', function () {
  it('has a real and an imaginary part', function() {
  });
  it('can conjugate', function() {
    var z = new Complex(1, 2);
    z.conjugate();
    assert.equal(z.im(), -2);

    // Operator conjugate returns a reference to the complex number object.
    assert.ok(z.conjugate() instanceof Complex);
  });
});

