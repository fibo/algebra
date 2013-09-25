var AlgebraVectorSpace, RealField, RealVectorSpace, abstractSpace, algebra, dimension, real, space;

algebra = require('../index');

AlgebraVectorSpace = algebra.AlgebraVectorSpace;

RealField = algebra.RealField;

RealVectorSpace = algebra.RealVectorSpace;

dimension = 2;

real = new RealField();

space = new RealVectorSpace(dimension);

abstractSpace = new AlgebraVectorSpace(real, dimension);

describe('RealVectorSpace', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraVectorSpace', function() {
      return space.should.be.instanceOf(AlgebraVectorSpace);
    });
  });
  describe('Constructor', function() {});
  describe('Attributes', function() {
    describe('#dimension', function() {
      return it('is a number', function() {
        return space.dimension.should.be.a.number;
      });
    });
    return describe('#field', function() {
      return it('is a real field', function() {
        return space.field.should.be.instanceOf(RealField);
      });
    });
  });
  return describe('Methods', function() {
    describe('#Vector()', function() {
      return it('is inherited by AlgebraVectorSpace', function() {
        return space.dimension.should.be.eql(abstractSpace.dimension);
      });
    });
    return describe('#containsVector()', function() {
      return it('is inherited by AlgebraVectorSpace');
    });
  });
});
