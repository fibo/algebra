
var assert = require('assert');
var algebra = require('../index.js');

var Element = algebra.Element;

describe('Element', function () {
  describe('constructor:', function () {
    it('accepts any argument', function () {
      var element = new Element(5);
      assert.ok(element instanceof Element);
      // TODO metti gli altri tipi di dato, incluso undefined che dovrebbe restituire il vuoto (emptyness)
    });
  });

  describe('data', function () {
    it('is an attribute', function () {
      var data = 5;
      var element = new Element(data);

      assert.ok(element.data === data);
    });
  });
});

