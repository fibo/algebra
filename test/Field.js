
var assert = require('assert');
var algebra = require('../index.js');

var Ring  = algebra.Ring;
var Field = algebra.Field;

var field = new Field();

describe('Field', function () {
  describe('constructor:', function () {
    it('works', function () {
      assert.ok(field instanceof Field);
    });
  });

  describe('inheritance:', function () {
    it('is a Ring', function () {
      assert.ok(field instanceof Ring);
    });
  });
});

