var AlgebraField, AlgebraMatrixSpace, AlgebraTensorSpace, RealField, algebra, real;

algebra = require('../index');

AlgebraField = algebra.AlgebraField;

AlgebraMatrixSpace = algebra.AlgebraMatrixSpace;

AlgebraTensorSpace = algebra.AlgebraTensorSpace;

RealField = algebra.RealField;

real = new RealField();

describe('AlgebraMatrixSpace', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraTensorSpace', function() {
      var dimension, field, space;
      field = real;
      dimension = 2;
      space = new AlgebraMatrixSpace(field, dimension);
      return space.should.be.instanceOf(AlgebraTensorSpace);
    });
  });
  describe('Constructor', function() {
    it('has signature (field, degree)', function() {
      var degree, field, space;
      field = real;
      degree = 2;
      space = new AlgebraMatrixSpace(field, degree);
      return space.should.be.instanceOf(AlgebraMatrixSpace);
    });
    return it('has signature (field, [numRows, numColumns])', function() {
      var field, mXn, space;
      field = real;
      mXn = [2, 3];
      space = new AlgebraMatrixSpace(field, mXn);
      return space.should.be.instanceOf(AlgebraMatrixSpace);
    });
  });
  describe('Attributes', function() {
    var field, mXn, space;
    field = real;
    mXn = [2, 3];
    space = new AlgebraMatrixSpace(field, mXn);
    describe('#dimension', function() {
      it('is a number', function() {
        return space.dimension.should.be.a.number;
      });
      return it('is the numRows by numColumns', function() {
        var dimension;
        dimension = mXn[0] * mXn[1];
        return space.dimension.should.be.eql(dimension);
      });
    });
    return describe('#field', function() {
      return it('is a real field', function() {
        return space.field.should.be.instanceOf(AlgebraField);
      });
    });
  });
  return describe('Methods', function() {
    describe('#Matrix()', function() {
      return it('is a constructor');
    });
    return describe('#containsMatrix()', function() {
      return it('checks that the given matrix belongs to this matrix space');
    });
  });
});
