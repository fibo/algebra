var AlgebraField, ComplexField, algebra, complex;

algebra = require('../index.js');

AlgebraField = algebra.AlgebraField;

ComplexField = algebra.ComplexField;

complex = new ComplexField();

describe('ComplexField', function() {
  describe('inheritance', function() {
    return it('is an AlgebraField', function() {
      return complex.should.be["instanceof"](AlgebraField);
    });
  });
  describe('attributes', function() {
    describe('#one', function() {
      it('should be [1, 0]', function() {
        return complex.one.should.eql([1, 0]);
      });
      return it('cannot be overridden', function() {
        return (function() {
          return complex.one = [1, 1];
        }).should.throwError();
      });
    });
    return describe('#zero', function() {
      it('should be [0, 0]', function() {
        return complex.zero.should.eql([0, 0]);
      });
      return it('cannot be overridden', function() {
        return (function() {
          return complex.zero = [1, 1];
        }).should.throwError();
      });
    });
  });
  return describe('methods', function() {
    describe('#addition()', function() {
      return it('implements +', function() {
        return complex.addition([1, 4], [-1, 1]).should.eql([0, 5]);
      });
    });
    return describe('#subtraction()', function() {
      return it('implements -', function() {
        return complex.subtraction([2, 3], [2, -5]).should.eql([0, 8]);
      });
    });
  });
});
