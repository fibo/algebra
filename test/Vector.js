
var assert  = require('assert')
  , algebra = require('../index.js')

var abstractMethod = algebra.util.abstractMethod
  , Tensor = algebra.Tensor
  , Vector = algebra.Vector

var vector = new Vector()

describe('Vector', function () {
  describe('Constructor', function () {
    describe('arguments', function () {
    })
  })

  describe('Inheritance', function () {
    it('is a Tensor', function () {
      assert.ok(vector instanceof Tensor)
    })
  })

  describe('Methods', function () {
    describe('cross()', function () {
      it('implements the cross product operation', function () {
      })
    })
   
    describe('dot()', function () {
      it('implements the dot product operation', function () {
      });
    })
   
    describe('scalar()', function () {
      it('implements multiplication by scalar', function () {
      });
    });
   
    describe('getLength()', function () {
      it('returns the norm of the vector', function () {
      });
    });
   
    describe('getDim()', function () {
      it('returns vector dimension', function () {
      });
    });
   
    describe('r4c()', function () {
      it('implements rows for columns right multiplication by a matrix', function () {
      });
    });
  })
});

