
var assert = require('assert');
var algebra = require('../index.js');

var Element = algebra.Element;

var abstractMethod = algebra.util.abstractMethod;

var element = new Element();

describe('Element', function () {
  describe('constructor:', function () {
    it('accepts any argument', function () {
      var element = new Element(5);
      assert.ok(element instanceof Element);
      // TODO metti gli altri tipi di dato, incluso undefined che dovrebbe restituire il vuoto (emptyness)
    });
  });

  describe('clone()', function () {
    it('is an abstract method', function () {
      assert.ok(element.clone === abstractMethod);
    });
  });

  describe('data', function () {
    it('is an attribute', function () {
      // TODO fai getData, ho fatto le prove ed ha senso.
      var data = 5;
      var element = new Element(data);

      assert.ok(element.data === data);
    });
  });
});

