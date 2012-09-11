
var assert = require('assert');
var Matrix = require('../index.js').Matrix;

describe('Matrix', function () {
  describe('identity', function () {
    it('is the default identity matrix', function () {

      var id = new Matrix();
      assert.equal(1, id.data[0][0]);
      assert.equal(1, id.ij(0,0));
      var i = 1;
      assert.equal(0, id.ij(0,i));
      var data = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
      assert.deepEqual(id.data,data);

    });
  });
  describe('constructor', function () {
    it('accepts one integer as dimension parameter', function () {

      var dim = 3;
      var m2 = new Matrix(dim);
      assert.equal(dim, m2.dim);

      it('which defaults to 4', function () {

        var m1 = new Matrix();
        assert.equal(4, m1.dim);

      });
    });
  });
});
