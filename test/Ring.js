
var assert = require('assert');
var algebra = require('../index.js');

var Group = algebra.Group;
var Ring  = algebra.Ring;

var abstractMethod = algebra.util.abstractMethod;

var ring = new Ring();

describe('Ring', function () {
  describe('constructor:', function () {
    it('works', function () {
      assert.ok(ring instanceof Ring);
    });
  });

  describe('inheritance:', function () {
    it('is a Group', function () {
      assert.ok(ring instanceof Group);
    });
  });

  describe('getOne()', function () {
    it('is an abstract method', function () {
      assert.ok(ring.getZero === abstractMethod);
    });
  });

  describe('inversion()', function () {
  });

  describe('multiplication()', function () {
  });

  describe('division()', function () {
  });
});

