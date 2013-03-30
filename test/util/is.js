
var assert  = require('assert');
var algebra = require('../../index.js');

var is = algebra.util.is;

describe('util.is', function () {
  describe('undef', function () {
    it('return true if argument is undefined', function () {
      assert.ok(is.undef(undefined));
    });
  });

  describe('number', function () {
    it('return true if argument is a number', function () {
      assert.ok(is.number(4));
    });
  });

  describe('notNumber', function () {
    it('return true if argument is a not number', function () {
      assert.ok(is.notNumber({}));
      assert.ok(is.notNumber([4]));
    });
  });
});


