var AlgebraVectorSpace, RealElement, RealVectorSpace, abstractSpace, algebra, dimension, space;

algebra = require('../index');

AlgebraVectorSpace = algebra.AlgebraVectorSpace;

RealElement = algebra.RealElement;

RealVectorSpace = algebra.RealVectorSpace;

dimension = 2;

space = new RealVectorSpace(dimension);

abstractSpace = new AlgebraVectorSpace(RealElement, dimension);

describe('RealVectorSpace', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraVectorSpace', function() {
      return space.should.be.instanceOf(AlgebraVectorSpace);
    });
  });
  describe('Constructor', function() {});
  describe('Attributes', function() {
    return describe('#dimension', function() {
      return it('is a number', function() {
        return space.dimension.should.be.a.number;
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
