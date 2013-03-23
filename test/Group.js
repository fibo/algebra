
var assert = require('assert');
var algebra = require('../index.js');

var Group = algebra.Group;

var abstractMethod = algebra.util.abstractMethod;

var group = new Group();

describe('Group', function () {
  describe('Constructor', function () {
    it('synopsis', function () {
      var group = new Group();
      assert.ok(group instanceof Group);
    });
  });

  describe('Methods', function () {
    describe('coerceToElement()', function () {
      it('is an abstract method', function () {
        assert.ok(group.coerceToElement === abstractMethod);
      });
    });

    describe('getZero()', function () {
      it('is an abstract method', function () {
        assert.ok(group.getZero === abstractMethod);
      });
    });

    describe('addition()', function () {
      it('is delegated to element');
    });

    describe('add()', function () {
      it('is an alias of addition()', function () {
        assert.ok(group.add === group.addition); 
      });
    });

    describe('equals()', function () {
      it('is delegated to element');
    });

    describe('eq()', function () {
      it('is an alias of equals()', function () {
        assert.ok(group.eq === group.equals); 
      });
    });

    describe('negation()', function () {
      it('is delegated to element');
    });

    describe('neg()', function () {
      it('is an alias of negation()', function () {
        assert.ok(group.neg === group.negation); 
      });
    });

    describe('notEquals()', function () {
      it('is delegated to element');
    });

    describe('ne()', function () {
      it('is an alias of notEquals()', function () {
        assert.ok(group.ne === group.notEquals); 
      });
    });

    describe('subtraction()', function () {
      it('is delegated to element');
    });

    describe('sub()', function () {
      it('is an alias of subtraction()', function () {
        assert.ok(group.sub === group.subtraction); 
      });
    });
  });
});

