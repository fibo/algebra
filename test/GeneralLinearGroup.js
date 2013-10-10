var AlgebraField, AlgebraMatrixSpace, ComplexField, GeneralLinearGroup, RealField, algebra, complex, real;

algebra = require('../index');

AlgebraField = algebra.AlgebraField;

AlgebraMatrixSpace = algebra.AlgebraMatrixSpace;

ComplexField = algebra.ComplexField;

GeneralLinearGroup = algebra.GeneralLinearGroup;

RealField = algebra.RealField;

complex = new ComplexField();

real = new RealField();

describe('GeneralLinearGroup', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraMatrixSpace', function() {
      var degree, field, gl;
      field = real;
      degree = 2;
      gl = new GeneralLinearGroup(field, degree);
      return gl.should.be.instanceOf(AlgebraMatrixSpace);
    });
  });
  describe('Constructor', function() {
    return it('has signature (field, degree)', function() {
      var degree, field, gl;
      field = real;
      degree = 2;
      gl = new AlgebraMatrixSpace(field, degree);
      return gl.should.be.instanceOf(AlgebraMatrixSpace);
    });
  });
  describe('Attributes', function() {
    var degree, field, gl;
    field = complex;
    degree = 3;
    gl = new AlgebraMatrixSpace(field, degree);
    describe('#dimension', function() {
      it('is a number', function() {
        return gl.dimension.should.be.a.number;
      });
      return it('is the square of degree', function() {
        var dimension;
        dimension = degree * degree;
        return gl.dimension.should.be.eql(dimension);
      });
    });
    return describe('#field', function() {
      return it('returns the field', function() {
        return gl.field.should.be.eql(field);
      });
    });
  });
  return describe('Methods', function() {
    describe('#Matrix()', function() {
      return it('is a constructor');
    });
    return describe('#containsMatrix()', function() {
      return it('checks that the given matrix belongs to this matrix gl');
    });
  });
});
