
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
});
