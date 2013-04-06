
var assert = require('assert');
var algebra = require('../index.js');

var Field = algebra.Field;

var field = new Field();

describe('Field', function () {
  describe('Constructor', function () {
    it('works', function () {
      var field = new Field();
      assert.ok(field instanceof Field);
    });
  });
// TODO aggiungi tutti i metodi astratti
});

