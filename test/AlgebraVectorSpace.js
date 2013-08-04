var AlgebraTensorSpace, AlgebraVectorSpace, RealField, algebra, real;

algebra = require('../index');

AlgebraVectorSpace = algebra.AlgebraVectorSpace;

AlgebraTensorSpace = algebra.AlgebraTensorSpace;

RealField = algebra.RealField;

real = new RealField();

describe('AlgebraVectorSpace', function() {
  describe('constructor', function() {
    return it('has signature (field, dimension)', function() {
      var dimension, field, space;
      field = real;
      dimension = 2;
      space = new AlgebraVectorSpace(field, dimension);
      return space.should.be.instanceOf(AlgebraVectorSpace);
    });
  });
  describe('inheritance', function() {
    return it('is an AlgebraTensorSpace', function() {
      var dimension, field, space;
      field = real;
      dimension = 2;
      space = new AlgebraVectorSpace(field, dimension);
      return space.should.be.instanceOf(AlgebraTensorSpace);
    });
  });
  return describe('attributes', function() {
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
});
