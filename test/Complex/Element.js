
var assert = require('assert');
var algebra = require('../../index.js');

var Complex      = algebra.Complex.Element;
var ComplexField = algebra.Complex.Field;

var C = new ComplexField();

describe('ComplexElement', function () {
  describe('constructor:', function () {
    it('accepts 2 arguments', function () {
      var z = new Complex(1, 2);

      assert.ok(z instanceof Complex);
    });

    it('accepts 1 argument, second one defaults to 0', function () {
      var z = new Complex(1);

      assert.ok(z instanceof Complex);

      assert.equal(z.im(), 0);
    });

    it('Defaults to (0, 0) if no argument is provided', function () {
      var z = new Complex();

      assert.ok(z instanceof Complex);

      assert.equal(z.re(), 0);
      assert.equal(z.im(), 0);
    });
  });

  describe('clone()', function () {
    it('returns a copy of the object', function () {
      var z = new Complex(-15, 2);
      var w = z.clone();

      assert.ok(w instanceof Complex);

      assert.ok(z.eq(w));

      assert.ok(z !== w);
    });
  });

  describe('re()', function () {
    it('returns the real part', function () {
      var z = new Complex(1, 2);
      assert.equal(z.re(), 1);
    });
  });

  describe('im()', function () {
    it('returns the imaginary part', function () {
      var z = new Complex(1, 2);
      assert.equal(z.im(), 2);
    });
  });

  describe('xy()', function () {
    it('returns the real and imaginary part', function () {
      var z = new Complex(1, 2);
      assert.deepEqual(z.xy(), [1, 2]);
    });
  });

  describe('isZero()', function () {
    it('returns true if element is zero', function () {
      var z = new Complex(0, 0);
      assert.ok(z.isZero());
    });
  });

  describe('isOne()', function () {
    it('returns true if element is one', function () {
      var z = new Complex(1, 0);
      assert.ok(z.isOne());
    });
  });

  describe('norm()', function () {
    it('returns the euclidean norm', function () {
      var z1 = new Complex(1, 2);
      assert.equal(z1.norm(), 5);

      var z2 = new Complex(5, -2);
      assert.equal(z2.norm(), 29);

      // The norm of the product is the product of the norm.
      assert.equal(z1.mul(z2).norm(), 5 * 29);
    });
  });

  describe('conj()', function () {
    var z = new Complex(1, 2);

    it('implements complex conjugation', function () {
      var im = z.im();
      z.conj();
      assert.equal(z.im(), 0 - im);
    });

    it('can be chained', function () {
      assert.ok(z.conj().conj() instanceof Complex);
    });
  });

  describe('eq(<number|Complex>)', function () {
    it('returns true if two elements are equal', function () {
      var z = new Complex(-1, 5);
      var w = new Complex(-1, 5);

      assert.ok(z.eq(w));
      assert.ok(w.eq(z));
    });

    it('corces number type', function () {
      var z = new Complex(-1);
      assert.ok(z.eq(-1));
    });

    it('has reflection property', function () {
      var z = new Complex(-1, 2);
      assert.ok(z.eq(z));
    });
  });

  describe('neg()', function () {
    it('implements inversion by addition operator', function () {
      var z = new Complex(4, 1);
      var w = z.clone().neg();
      assert.ok(z.add(w).eq(C.getZero()));
    });

    it('can be chained', function () {
      var z = new Complex(-1,8);
      assert.ok(z.neg().neg() instanceof Complex);
    });
  });

  describe('add(<number|Complex>)', function () {
    it('implements the addition operator', function () {
      var z = new Complex(1, 4);
      var w = new Complex(0, 1);

      z.add(w);

      assert.equal(z.re(), 1);
      assert.equal(z.im(), 5);
    });

    it('coerces number type', function () {
      var z = new Complex(2, 1);

      z.add(3);

      assert.equal(z.re(), 5);
      assert.equal(z.im(), 1);
    });

    it('can be chained', function () {
      var z = new Complex(1, 2);

      assert.ok(z.add(1).add(z) instanceof Complex);
    });
  });

  describe('sub(<number|Complex>)', function () {
    it('implements the subtraction operator', function () {
      var one = new Complex(1);
      var i = new Complex(0, 1);

      var z = one.sub(i);

      assert.equal(z.re(), 1);
      assert.equal(z.im(), -1);
    });

    it('coerces number type', function () {
      var z = new Complex(20);
      z.sub(3);
      assert.equal(z.re(), 17);
    });

    it('can be chained', function () {
      var z = new Complex(1, 2);
      assert.ok(z.sub(1).sub(z) instanceof Complex);
    });
  });

  describe('inv()', function () {
    it('inverts the element', function () {
      var z1 = new Complex(0, 1);
      z1.inv();
      assert.equal(z1.re(), 0);
      assert.equal(z1.im(), -1);

      var z2 = new Complex(2, 0);
      z2.inv();
      assert.equal(z2.re(), 0.5);
      assert.equal(z2.im(), 0);
    });

    it('can be chained', function () {
      var z = new Complex(1, 4);
      assert.ok(z.inv().inv() instanceof Complex);
    });
  });

  describe('mul(<number|Complex>)', function () {
    it('implements the multiplication operator', function () {
      var two = new Complex(2);
      var z = new Complex(1, 1);
      var twoZ = two.mul(z);
      assert.equal(twoZ.re(), 2);
      assert.equal(twoZ.im(), 2);

      z.mul(z);
      assert.equal(z.re(), 0);
      assert.equal(z.im(), 2);
    });

    it('coerces number type', function () {
      var z = new Complex(2, -1);
      z.mul(3);
      assert.equal(z.re(), 6);
    });

    it('can be chained', function () {
      var z = new Complex(2, 1);
      assert.ok(z.mul(z).mul(1) instanceof Complex);
    });
  });

  describe('div(<number|Complex>)', function () {
    it('implements the division operator', function () {
      var z1 = new Complex(5);
      var w1 = new Complex(1);
      z1.div(w1);
      assert.equal(z1.re(), 5);
      assert.equal(z1.im(), 0);

      var z2 = new Complex(5);
      var w2 = new Complex(2, 1);
      z2.div(w2);
      assert.equal(z2.re(), 2);
      assert.equal(z2.im(), -1);
    });

    it('coerces number type', function () {
      var z = new Complex(2, -1);
      z.div(2);
      assert.equal(z.re(), 1);
    });

    it('can be chained', function () {
      var z = new Complex(2, 1);
      assert.ok(z.div(z).div(1) instanceof Complex);
    });
  });

  describe('abs()', function () {
    it('return the absolute value', function () {
      var z1 = new Complex(2);
      assert.equal(z1.abs(), 2);

      var z2 = new Complex(3, 4);
      assert.equal(z2.abs(), 5);
    });
  });

  describe('arg()', function () {
    it('...', function () {
    });
  });

  describe('toString()', function () {
    it('...', function () {
    });
  });

  describe('toMatrix()', function () {
    it('...', function () {
    });
  });
});

