var AlgebraElement, RealElement, RealField, algebra, element, real, x, y;

algebra = require('../index.js');

AlgebraElement = algebra.AlgebraElement;

RealElement = algebra.RealElement;

RealField = algebra.RealField;

element = new RealElement();

real = new RealField();

x = new RealElement(2);

y = new RealElement(-10);

describe('RealElement', function() {
  describe('inheritance', function() {
    return it('is an AlgebraElement', function() {
      return element.should.be.instanceOf(AlgebraElement);
    });
  });
  describe('constructor', function() {
    it('data should default to 1', function() {
      return element.data.should.equal(real.one);
    });
    return it('accepts one argument', function() {
      x.data.should.equal(2);
      return y.data.should.equal(-10);
    });
  });
  return describe('methods', function() {
    describe('#addition()', function() {
      it('implements +', function() {
        x.data = 2;
        y.data = -10;
        x.addition(y);
        return x.data.should.equal(-8);
      });
      return it('can be chained', function() {});
    });
    return describe('#subtraction()', function() {
      it('implements -', function() {
        x.data = 8;
        y.data = 4;
        y.subtraction(x);
        return y.data.should.equal(-4);
      });
      return it('can be chained', function() {});
    });
  });
});
