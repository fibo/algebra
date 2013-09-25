var AlgebraVector, RealField, RealTensor, RealVector, abstractVector, algebra, real, vector;

algebra = require('../index');

AlgebraVector = algebra.AlgebraVector;

RealField = algebra.RealField;

RealTensor = algebra.RealTensor;

RealVector = algebra.RealVector;

real = new RealField();

vector = new RealVector(0, 0, 1);

abstractVector = new AlgebraVector(real, [0, 0, 1]);

describe('RealVector', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraVector', function() {
      return vector.should.be.instanceOf(AlgebraVector);
    });
  });
  describe('Constructor', function() {
    it('has signature (v1, v2, ... vn)', function() {
      vector = new RealVector(0, 1);
      vector.should.be.instanceOf(RealVector);
      vector = new RealVector(0, 1, 2);
      vector.should.be.instanceOf(RealVector);
      vector = new RealVector(0, 1, 2, 3);
      return vector.should.be.instanceOf(RealVector);
    });
    return it('has signature ([v1, v2, ... vn])', function() {
      vector = new RealVector([1, -1]);
      vector.should.be.instanceOf(RealVector);
      vector = new RealVector([1, 0, -1]);
      return vector.should.be.instanceOf(RealVector);
    });
  });
  describe('Attributes', function() {
    describe('#field', function() {
      return it('is a RealField', function() {
        return vector.field.should.be.instanceOf(RealField);
      });
    });
    return describe('#dimension', function() {
      return it('returns vector dimension, that is the number of elements', function() {
        vector = new RealVector(0, 1);
        vector.dimension.should.be.eql(2);
        return vector = new RealVector([1, 0, -1]);
      });
    });
  });
  return describe('Methods', function() {
    return describe('#addition()', function() {
      return it('implements +');
    });
  });
});
