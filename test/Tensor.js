
var assert = require('assert');
var algebra = require('../index.js');

var Tensor = algebra.Tensor;

var abstractMethod = algebra.util.abstractMethod;

var tensor = new Tensor();

describe('Tensor', function () {
  describe('Constructor', function () {
    describe('arguments', function () {
      describe('indices', function () {
        it('defaults to [0]', function () {
          assert.deepEqual(tensor.getIndices(), [0]);
        });
      });
    });
  });

  describe('Methods', function () {
    describe('addition()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.addition === abstractMethod);
      });
    });

    describe('clone()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.clone === abstractMethod);
      });
    });
   
    describe('equals()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.equals === abstractMethod);
      });
    });

    describe('getIndices()', function () {
      it('returns tensor indices', function () {
        var indices = [1, 4, 6];
        var tensor = new Tensor({indices: indices});
        assert.deepEqual(tensor.getIndices(), indices);
      })
    });

    describe('inversion()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.inversion === abstractMethod);
      });
    });

    describe('multiplication()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.multiplication === abstractMethod);
      });
    });

    describe('notEquals()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.notEquals === abstractMethod);
      });
    });

    describe('subtraction()', function () {
      it('is an abstract method', function () {
        assert.ok(tensor.subtraction === abstractMethod);
      });
    });
  });
});


