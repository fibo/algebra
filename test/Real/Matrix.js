
var assert  = require('assert');
var algebra = require('../../index.js');

var Matrix     = algebra.Matrix;
var RealMatrix = algebra.Real.Matrix;

var matrix = new RealMatrix();

describe('RealMatrix', function () {
    describe('constructor:', function () {
      it('works', function () {
      });
    });

    describe('inheritance:', function () {
      it('from Matrix', function () {
        assert.ok(matrix instanceof Matrix);
      });
    });

    describe('methods:', function () {
        describe('method1()', function () {
          it('does something', function () {
       
          });
        });
    });
});

