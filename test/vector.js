
var assert = require('assert');
var Vector = require('../index.js').Vector;

describe('Vector', function () {
  describe('identity', function () {

      var id = new Vector();
      assert.equal(1, id.data[0]);
      assert.equal(1, id.o(0));
      assert.equal(0, id.o(1));
      assert.equal(0, id.o(2));
      assert.equal(0, id.o(3));
  });
  describe('constructor', function () {
    it('accepts one integer as dimension parameter', function () {

      var dim = 3;
      var vector = new Vector(dim);
      assert.equal(dim, vector.dim);

      it('which defaults to 4', function () {

        var vector = new Vector();
        assert.equal(4, vector.dim);

      });
    });
  });
});
