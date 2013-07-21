var AlgebraField, RealField, algebra, real;

algebra = require('../index.js');

AlgebraField = algebra.AlgebraField;

RealField = algebra.RealField;

real = new RealField();

describe('RealField', function() {
  describe('inheritance', function() {
    return it('is an AlgebraField', function() {
      return real.should.be.instanceOf(AlgebraField);
    });
  });
  describe('attributes', function() {
    describe('#one', function() {
      it('should be 1', function() {
        return real.one.should.eql(1);
      });
      return it('cannot be overridden', function() {
        return (function() {
          return real.one = 5;
        }).should.throwError();
      });
    });
    return describe('#zero', function() {
      it('should be 0', function() {
        return real.zero.should.eql(0);
      });
      return it('cannot be overridden', function() {
        return (function() {
          return real.zero = 5;
        }).should.throwError();
      });
    });
  });
  return describe('methods', function() {
    describe('#addition()', function() {
      return it('implements +', function() {
        return real.addition(4, 3).should.eql(7);
      });
    });
    describe('#subtraction()', function() {
      return it('implements -', function() {
        return real.subtraction(4, 3).should.eql(1);
      });
    });
    describe('#multiplication()', function() {
      return it('implements *', function() {
        return real.multiplication(4, 3).should.eql(12);
      });
    });
    return describe('#division()', function() {
      return it('implements /', function() {
        return real.division(12, 3).should.eql(4);
      });
    });
  });
});
