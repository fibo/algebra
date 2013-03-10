
var assert = require('assert');
var algebra = require('../index.js');

var Element     = algebra.Element;
var RingElement = algebra.RingElement;

var element = new RingElement();

describe('RingElement', function () {
  describe('constructor:', function () {
    it('', function () {
    });
  });

  describe('inheritance:', function () {
    it('is an Element', function () {
      assert.ok(element instanceof Element);
    });
  });

  describe('lmul()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('rmul()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('rinv()', function () {
    it('is an abstract function', function () {
    });
  });

  describe('linv()', function () {
    it('is an abstract function', function () {
    });
  });
});

