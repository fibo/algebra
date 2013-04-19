
var assert  = require('assert')
  , algebra = require('../index.js')

var abstractMethod = algebra.util.abstractMethod
  , Matrix         = algebra.Matrix
  , Tensor         = algebra.Tensor
  

var matrix = new Matrix()

describe('Matrix', function () {
  describe('Constructor', function () {
  });

  describe('Inheritance', function () {
    it('is a Tensor', function () {
      assert.ok(matrix instanceof Tensor)
    })
  })

  describe('Methods', function () {
  });
});

