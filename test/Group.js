
var assert = require('assert');
var algebra = require('../index.js');

var Group = algebra.Group;

var abstractMethod = algebra.util.abstractMethod;

var group = new Group();

describe('Group', function () {
  describe('constructor:', function () {
    it('works', function () {
      assert.ok(group instanceof Group);
    });
  });

  describe('getZero()', function () {
    it('is an abstract method', function () {
      assert.ok(group.getZero === abstractMethod);
    });
  });

  describe('equals(Element)', function () {
  });

  describe('negation()', function () {
  });

  describe('addition()', function () {
  });

  describe('subtraction()', function () {
  });
});

