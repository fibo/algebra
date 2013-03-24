
var assert = require('assert');
var algebra = require('../index.js');

var Group = algebra.Group;
var Ring  = algebra.Ring;

var abstractMethod = algebra.util.abstractMethod;

var ring = new Ring();

describe('Ring', function () {
  describe('Constructor', function () {
    it('requires no argument', function () {
      var ring = new Ring();
      assert.ok(ring instanceof Ring);
    });
  });

  describe('Inheritance', function () {
    it('is a Group', function () {
      assert.ok(ring instanceof Group);
    });
  });

  describe('Methods', function () {
    describe('getOne()', function () {
      it('is an abstract method', function () {
        assert.ok(ring.getOne === abstractMethod);
      });
    });
   
    describe('inversion()', function () {
    });
   
    describe('multiplication()', function () {
    });

    describe('division()', function () {
    });
  });

});

