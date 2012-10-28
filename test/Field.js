
var assert = require('assert');
var algebra = require('../index.js');

var Group = algebra.Group;
var Field = algebra.Field;

describe('Field', function () {
  describe('constructor:', function () {
    it('requires', function() {
    });
  });

  describe('inheritance:', function () {
    it('is a Group', function() {
      var field = new Field();
      assert.ok(field instanceof Group);
    });
  });

  describe('getOne()', function() {
  });

  describe('inv()', function() {
  });

  describe('mul()', function() {
  });

  describe('div()', function() {
  });
});



