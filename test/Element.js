
var assert = require('assert');
var algebra = require('../index.js');

var Element = algebra.Element;

var abstractMethod = algebra.util.abstractMethod;

var element = new Element(0);

describe('Element', function () {
  describe('Constructor', function () {
    it('accepts a number', function () {
      var element = new Element(5);
      assert.ok(element instanceof Element);
    });
  });

  describe('Methods', function () {
    describe('clone()', function () {
      it('is an abstract method', function () {
        assert.ok(element.clone === abstractMethod);
      });
    });
   
    describe('equals()', function () {
      it('is an abstract method', function () {
        assert.ok(element.equals === abstractMethod);
      });
    });

    describe('getData()', function () {
      it('is an abstract method', function () {
        assert.ok(element.getData === abstractMethod);
      });
    });

    describe('isZero()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isZero === abstractMethod);
      });
    });
   
    describe('isNotZero()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isNotZero === abstractMethod);
      });
    });
   
    describe('isOne()', function () {
      it('is an abstract method', function () {
        assert.ok(element.isOne === abstractMethod);
      });
    });

    describe('notEquals()', function () {
      it('is an abstract method', function () {
        assert.ok(element.notEquals === abstractMethod);
      });
    });
  });
});

