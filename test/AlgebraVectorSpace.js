var AlgebraField, AlgebraTensorSpace, AlgebraVectorSpace, RealField, algebra, real;

algebra = require('../index');

AlgebraField = algebra.AlgebraField;

AlgebraVectorSpace = algebra.AlgebraVectorSpace;

AlgebraTensorSpace = algebra.AlgebraTensorSpace;

RealField = algebra.RealField;

real = new RealField();

describe('AlgebraVectorSpace', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraTensorSpace', function() {
      var dimension, field, space;
      field = real;
      dimension = 2;
      space = new AlgebraVectorSpace(field, dimension);
      return space.should.be.instanceOf(AlgebraTensorSpace);
    });
  });
  describe('Constructor', function() {
    return it('has signature (field, dimension)', function() {
      var dimension, field, space;
      field = real;
      dimension = 2;
      space = new AlgebraVectorSpace(field, dimension);
      return space.should.be.instanceOf(AlgebraVectorSpace);
    });
  });
  describe('Attributes', function() {
    var dimension, field, space;
    field = real;
    dimension = 2;
    space = new AlgebraVectorSpace(field, dimension);
    describe('#dimension', function() {
      return it('is a number', function() {});
    });
    return describe('#field', function() {
      return it('is a real field', function() {
        return space.field.should.be.instanceOf(AlgebraField);
      });
    });
  });
  return describe('Methods', function() {
    describe('#Vector()', function() {
      return it('is a constructor');
    });
    return describe('#containsVector()', function() {
      return it('checks that the given vector belongs to this vector space');
    });
  });
});
