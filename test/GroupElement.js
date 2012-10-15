
var assert = require('assert');
var algebra = require('../index.js');

var GroupElement = algebra.GroupElement;

describe('GroupElement', function () {
  describe('constructor:', function () {
    it('requires data arg', function() {
      var a = new GroupElement({data:0});
      assert.ok(a instanceof GroupElement);
    });
  });

  describe('clone()', function () {
    it('returns a copy of the object', function() {
// TODO se riesco ad implementare clone a livello di GroupElement
// potrei anche togliere i test dalle classi figlie?
    });
  });

  describe('eq()', function () {
    it('is an abstract function', function() {
    });
  });

  describe('add()', function () {
    it('is an abstract function', function() {
    });
  });

  describe('sub()', function () {
    it('is an abstract function', function() {
    });
  });

  describe('neg()', function () {
    it('is an abstract function', function() {
    });
  });
});

