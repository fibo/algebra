
var assert  = require('assert');
var algebra = require('../../index.js');

var Element     = algebra.Element;
var RealElement = algebra.Real.Element;
var RealField   = algebra.Real.Field;

var R = new RealField();

var n = new RealElement(0);

describe('RealElement', function () {
  describe('Constructor', function () {
    it('accepts a number as single argument', function () {
      var ten = new RealElement(10);
      assert.ok(ten instanceof RealElement);
    });
  });

  describe('Inheritance', function () {
    it('is an Element', function () {
      assert.ok(n instanceof Element);
    });
  });

  describe('Methods', function () {
    describe('clone()', function () {
      it('returns a copy of the object', function () {
        var x = new RealElement(-15);
        var y = x.clone();
   
        assert.ok(y instanceof RealElement);
   
        assert.ok(x.eq(y));
   
        assert.ok(x !== y);
      });
    });
   
    describe('num()', function () {
      it('returns the real number', function () {
        var x = new RealElement(2.71);
   
        assert.equal(x.num(), 2.71);
      });

      it('is an alias of getData()', function () {
        assert.ok(n.num === n.getData); 
      });
    });
   
    describe('equals()', function () {
      it('returns true if two elements are equal', function () {
        var x = new RealElement(-1);
        var y = new RealElement(-1);
   
        assert.ok(x.eq(y));
        assert.ok(y.eq(x));
      });
   
      it('corces number type', function () {
        var x = new RealElement(-1);
        assert.ok(x.eq(-1));
      });
   
      it('has reflection property', function () {
        var x = new RealElement(2.7);
        assert.ok(x.eq(x));
      });
    });
   
    describe('eq()', function () {
      it('is an alias of equals()', function () {
        assert.ok(n.eq === n.equals);
      });
    });
   
    describe('notEquals()', function () {
      it('returns true if two elements are not equal', function () {
        var x = new RealElement(-1);
        var y = new RealElement(-2);
   
        assert.ok(x.notEquals(y));
        assert.ok(y.notEquals(x));
   
        y.add(1);
        assert.equal(x.notEquals(y), false);
      });
   
      it('corces number type', function () {
        var x = new RealElement(-1);
        assert.ok(x.notEquals(-2));
      });
    });
   
    describe('ne()', function () {
      it('is an alias of notEquals()', function () {
        assert.ok(n.eq === n.equals);
      });
    });
   
    describe('neg()', function () {
      it('implements inversion by addition operator', function () {
        var x = new RealElement(4);
        var y = x.clone();
        
        y.neg();
   
        assert.ok(x.add(y).isZero());
      });
   
      it('can be chained', function () {
        var x = new RealElement(-1);
        assert.ok(x.neg().neg() instanceof RealElement);
      });
    });
   
    describe('add()', function () {
      it('implements the addition operator', function () {
        var x = new RealElement(2);
        var y = new RealElement(3);
   
        x.add(y);
   
        assert.equal(x.num(), 5);
      });
   
      it('coerces number type', function () {
        var x = new RealElement(2);
   
        x.add(3);
   
        assert.equal(x.num(), 5);
      });
   
      it('can be chained', function () {
        var x = new RealElement(-1);
        assert.ok(x.add(2).add(x) instanceof RealElement);
      });
    });
   
    describe('sub()', function () {
      it('implements the subtraction operator', function () {
        var x = new RealElement(2);
        var y = new RealElement(3);
   
        x.sub(y);
   
        assert.equal(x.num(), -1);
      });
   
      it('coerces number type', function () {
        var x = new RealElement(20);
   
        x.sub(3);
   
        assert.equal(x.num(), 17);
      });
   
      it('can be chained', function () {
        var x = new RealElement(-1);
        assert.ok(x.sub(2).sub(x) instanceof RealElement);
      });
    });
   
    describe('inv()', function () {
      it('implements inversion by multiplication operator', function () {
        var x = new RealElement(-2);
        var y = x.clone();
        
        y.inv();
   
        assert.ok(x.mul(y).isOne());
      });
   
      it('can be chained', function () {
        var x = new RealElement(4);
        assert.ok(x.inv().inv() instanceof RealElement);
      });
    });
   
    describe('mul()', function () {
      it('implements the multiplication operator', function () {
        var x = new RealElement(2);
        var y = new RealElement(3);
   
        x.mul(y);
   
        assert.equal(x.num(), 6);
      });
   
      it('coerces number type', function () {
        var x = new RealElement(2);
   
        x.mul(3);
   
        assert.equal(x.num(), 6);
      });
   
      it('can be chained', function () {
        var x = new RealElement(2);
        assert.ok(x.mul(2).mul(4) instanceof RealElement);
      });
    });
   
    describe('div()', function () {
      it('implements the division operator', function () {
        var x = new RealElement(20);
        var y = new RealElement(4);
   
        x.div(y);
   
        assert.equal(x.num(), 5);
      });
   
      it('coerces number type', function () {
        var x = new RealElement(15);
   
        x.div(3);
   
        assert.equal(x.num(), 5);
      });
   
      it('can be chained', function () {
        var x = new RealElement(8);
   
        x.div(2).div(4);
   
        assert.equal(x.num(), 1);
      });
    });
   
    describe('exp()', function () {
      it('implements the exponential function', function () {
        var x = new RealElement(0);
   
        x.exp();
   
        assert.equal(x.num(), 1);
      });
   
      it('can be chained', function () {
        var x = new RealElement(2);
        assert.ok(x.exp() instanceof RealElement);
      });
    });
   
    describe('log()', function () {
      it('implements the real logarithm', function () {
        var x = new RealElement(1);
   
        x.log();
   
        assert.equal(x.num(), 0);
      });
   
      it('can be chained', function () {
        var x1 = new RealElement(2);
        assert.ok(x1.log() instanceof RealElement);
      });
    });

    describe('isZero()', function () {
      it('returns true if element is zero', function () {
        var x = new RealElement(0);
        assert.ok(x.isZero());
      });
    });
   
    describe('isOne()', function () {
      it('returns true if element is one', function () {
        var x = new RealElement(1);
        assert.ok(x.isOne());
      });
    });
   
    describe('isNotZero()', function () {
      it('returns true if element is not zero', function () {
        var x = new RealElement(10);
        assert.ok(x.isNotZero());
   
        x.mul(0);
        assert.equal(x.isNotZero(), false);
      });
    });
   
  });
});

