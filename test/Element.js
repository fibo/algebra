
var assert = require('assert');
var algebra = require('../index.js');

var Element = algebra.Element;

var abstractMethod = algebra.util.abstractMethod;

var element = new Element();

describe('Element', function () {
  describe('Constructor', function () {
    it('accepts a number', function () {
      var element = new Element(5);
      assert.ok(element instanceof Element);
    });

    it('accepts an array of numbers')
  });

  describe('Methods', function () {

    describe('clone()', function () {
      it('is an abstract method', function () {
        assert.ok(element.clone === abstractMethod);
      });
    });
   
    describe('getData()', function () {
      it('returns data', function () {
        var data = 5;
        var element = new Element(data);
        assert.equal(element.getData(), data);
      });
    });
  });
});

