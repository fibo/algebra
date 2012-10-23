
// TODO confronta Real e Complex, a livello di test, metodi ecc
var assert = require('assert');
var algebra = require('../../index.js');

var Real         = algebra.Real.Element;
var FieldElement = algebra.FieldElement;

describe('RealElement', function () {
  describe('constructor:', function () {
    it('accepts a number as single argument', function() {
      var ten = new Real(10);
      assert.ok(ten instanceof Real);
    });
  });

  describe('inheritance:', function () {
    it('is a ...', function() {
    });
  });

  describe('clone()', function () {
    it('returns a copy of the object', function() {
      var x = new Real(-15);
      var y = x.clone();

      assert.ok(y instanceof Real);

      assert.ok(x.eq(y));

      assert.ok(x !== y);
    });
  });

  describe('eq(<number|Real>)', function () {
    it('returns true if two elements are equal', function() {
      var x = new Real(-1);
      var y = new Real(-1);

      assert.ok(x.eq(y));
      assert.ok(y.eq(x));
    });

    it('corces number type', function() {
      var x = new Real(-1);
      assert.ok(x.eq(-1));
    });
  });

  describe('neg(<Real>)', function () {
    it('implements inversion by addition operator', function() {
      var x = new Real(4);
      x.neg();
      assert.equal(x.num(), -4);
    });

    it('can be chained', function() {
      var x = new Real(-1);
      x.neg().neg();
      assert.equal(x.num(), -1);
    });
  });

  describe('add(<number|Real>)', function () {
    it('implements the addition operator', function() {
      var x = new Real(2);
      var y = new Real(3);
      x.add(y);
      assert.equal(x.num(), 5);
    });

    it('coerces number type', function() {
      var x = new Real(2);
      x.add(3);
      assert.equal(x.num(), 5);
    });

    it('can be chained', function() {
      var x = new Real(2);
      x.add(3).add(4);
      assert.equal(x.num(), 9);
    });
  });

  describe('sub(<Real>)', function () {
    it('implements the subtraction operator', function() {
      var x = new Real(2);
      var y = new Real(3);
      x.sub(y);
      assert.equal(x.num(), -1);
    });

    it('coerces number type', function() {
      var x = new Real(20);
      x.sub(3);
      assert.equal(x.num(), 17);
    });

    it('can be chained', function() {
      var x = new Real(2);
      x.sub(3).sub(4);
      assert.equal(x.num(), -5);
    });
  });

  describe('inv()', function () {
    it('inverts the element', function() {
      var x = new Real(-2);
      x.inv();
      assert.equal(x.num(), -0.5);
    });

    it('can be chained', function() {
      var x = new Real(4);
      x.inv().mul(4);
      assert.equal(x.num(), 1);
    });
  });

  describe('mul(<Real>)', function () {
    it('implements the multiplication operator', function() {
      var x = new Real(2);
      var y = new Real(3);
      x.mul(y);
      assert.equal(x.num(), 6);
    });

    it('coerces number type', function() {
      var x = new Real(2);
      x.mul(3);
      assert.equal(x.num(), 6);
    });

    it('can be chained', function() {
      var x = new Real(2);
      x.mul(3).mul(4);
      assert.equal(x.num(), 24);
    });
  });

  describe('div(<Real>)', function () {
    it('implements the division operator', function() {
      var x = new Real(20);
      var y = new Real(4);
      x.div(y);
      assert.equal(x.num(), 5);
    });

    it('coerces number type', function() {
      var x = new Real(15);
      x.div(3);
      assert.equal(x.num(), 5);
    });

    it('can be chained', function() {
      var x = new Real(8);
      x.div(2).div(4);
      assert.equal(x.num(), 1);
    });

    it('TODO division by 0 (in realta 1/0 fa Infinity)', function() {
// TODO siccome poi lo zero c'è in tutti i campi e non ci sono zero divisori (credo) nei campi, ci possono essere solo negli anelli, allora se faccio diviso zero deve lanciare un' eccezione
//
// Anche se ho Infinity, ma in algebra non va bene
//
// se voglio anche infinity devo usare una classe diversa , tipo R*, o la posso chaimare RealFieldPlus o RealFieldPlusInfinity
    });
  });

  describe('toString()', function () {
    it('...', function() {
    });
  });
});

