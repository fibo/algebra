var AlgebraVector, RealField, RealTensor, RealVector, algebra, vector;

algebra = require('../index.js');

AlgebraVector = algebra.AlgebraVector;

RealField = algebra.RealField;

RealTensor = algebra.RealTensor;

RealVector = algebra.RealVector;

vector = new RealVector();

describe('RealVector', function() {
  describe('inheritance', function() {
    return it('is an AlgebraVector', function() {
      return vector.should.be.instanceOf(AlgebraVector);
    });
  });
  describe('attributes', function() {
    return describe('#field', function() {
      return it('is a RealField', function() {
        return vector.field.shoud.be.instanceOf(RealField);
      });
    });
  });
  return describe('methods', function() {
    return describe('#addition()', function() {
      return it('implements +', function() {});
    });
  });
});
