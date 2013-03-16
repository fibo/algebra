
var assert  = require('assert');
var algebra = require('../../index.js');

var RealElement = algebra.Real.Element;

var coerce = algebra.util.coerce;

var toRealElement = coerce.toRealElement;

describe('util.coerce', function () {
  describe('toRealElement', function () {
    it('coerces a RealElement', function () {
      var x = new RealElement(2);
      var element = toRealElement(x);
      assert.ok(element instanceof RealElement);
    });

    it('coerces a number', function () {
      var element = toRealElement(2);
      assert.ok(element instanceof RealElement);
    });
  });
});

