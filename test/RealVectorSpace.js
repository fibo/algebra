var AlgebraVectorSpace, RealField, RealVectorSpace, algebra, space;

algebra = require('../index.js');

AlgebraVectorSpace = algebra.AlgebraVectorSpace;

RealField = algebra.RealField;

RealVectorSpace = algebra.RealVectorSpace;

space = new RealVectorSpace();

describe('RealVectorSpace', function() {
  describe('inheritance', function() {
    return it('is an AlgebraVectorSpace', function() {
      return space.should.be.instanceOf(AlgebraVectorSpace);
    });
  });
  describe('attributes', function() {
    describe('#dimension', function() {
      return it('is a number', function() {});
    });
    return describe('#field', function() {
      return it('is a real field', function() {
        return space.field.should.be.instanceOf(RealField);
      });
    });
  });
  return describe('methods', function() {
    return describe('#Vector()', function() {
      return it('is a constructor', function() {});
    });
  });
});
