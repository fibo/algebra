var AlgebraField, Real, RealField, algebra;

algebra = require('../index.js');

AlgebraField = algebra.AlgebraField;

RealField = algebra.RealField;

Real = new RealField();

describe('RealField', function() {
  describe('inheritance', function() {
    return it('is an AlgebraField', function() {
      return Real.should.be["instanceof"](AlgebraField);
    });
  });
  describe('attributes', function() {
    describe('#one', function() {
      return it('should be 1', function() {
        return Real.one.should.be.equal(1);
      });
    });
    return describe('#zero', function() {
      return it('should be 0', function() {
        return Real.zero.should.be.equal(0);
      });
    });
  });
  return describe('methods', function() {
    return describe('#addition()', function() {
      return it('implements +', function() {
        return Real.addition(4, 3).should.equal(7);
      });
    });
  });
});
