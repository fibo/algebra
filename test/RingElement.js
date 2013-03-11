
var assert = require('assert');
var algebra = require('../index.js');

var Element     = algebra.Element;
var RingElement = algebra.RingElement;

var element = new RingElement();

describe('RingElement', function () {
  describe('constructor:', function () {
    it('works', function () {
      assert.ok(element instanceof RingElement);
    });
  });

  describe('inheritance:', function () {
    it('is an Element', function () {
      assert.ok(element instanceof Element);
    });
  });

  describe('negation()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('addition()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('subtraction()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('leftMultiplication()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('rightMultiplication()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('inversion()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('leftDivision()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('rightDivision()', function () {
    it('is an abstract function', function () {
    });
  });
});

