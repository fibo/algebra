
var assert  = require('assert');
var algebra = require('../../index.js');

var is = algebra.util.is;

describe('util.is', function () {
  describe('array', function () {
    it('return true if argument is a array', function () {
      assert.ok(is.array([4, 5]));
    });
  });

  describe('elementWithNumberDataType', function () {
    it('return true if argument looks like an Element and has data of type number', function () {
      // Create a fake Element.
      var fakeElement = {
        getData: function() {
          return 1;
        }
      };

      assert.ok(is.elementWithNumberDataType(fakeElement));
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

  describe('undef', function () {
    it('return true if argument is undefined', function () {
      assert.ok(is.undef(undefined));
    });
  });
});


