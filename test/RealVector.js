var AlgebraVector, RealField, RealTensor, RealVector, algebra, vector;

algebra = require('../index.js');

AlgebraVector = algebra.AlgebraVector;

RealField = algebra.RealField;

RealTensor = algebra.RealTensor;

RealVector = algebra.RealVector;

vector = new RealVector(0, 0, 1);

describe('RealVector', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraVector', function() {
      return vector.should.be.instanceOf(AlgebraVector);
    });
  });
  describe('Constructor', function() {
    it('has signature (v1, v2, ... vn)', function() {
      vector = new RealVector(0, 1);
      return vector.should.be.instanceOf(RealVector);
    });
    return it('has signature ([v1, v2, ... vn])', function() {
      vector = new RealVector([1, -1]);
      return vector.should.be.instanceOf(RealVector);
    });
  });
  describe('attributes', function() {
    describe('#field', function() {
      return it('is a RealField', function() {
        return vector.field.should.be.instanceOf(RealField);
      });
    });
    return describe('#dimension', function() {});
  });
  return describe('Methods', function() {
    return describe('#addition()', function() {
      return it('implements +', function() {});
    });
  });
});
