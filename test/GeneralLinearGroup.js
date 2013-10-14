var AlgebraMatrixSpace, ComplexElement, GeneralLinearGroup, RealElement, algebra;

algebra = require('../index');

AlgebraMatrixSpace = algebra.AlgebraMatrixSpace;

ComplexElement = algebra.ComplexElement;

GeneralLinearGroup = algebra.GeneralLinearGroup;

RealElement = algebra.RealElement;

describe('GeneralLinearGroup', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraMatrixSpace', function() {
      var Element, degree, gl;
      Element = RealElement;
      degree = 2;
      gl = new GeneralLinearGroup(Element, degree);
      return gl.should.be.instanceOf(AlgebraMatrixSpace);
    });
  });
  describe('Constructor', function() {
    return it('has signature (field, degree)', function() {
      var Element, degree, gl;
      Element = RealElement;
      degree = 2;
      gl = new GeneralLinearGroup(Element, degree);
      return gl.should.be.instanceOf(AlgebraMatrixSpace);
    });
  });
  describe('Attributes', function() {
    var Element, degree, gl;
    Element = ComplexElement;
    degree = 3;
    gl = new AlgebraMatrixSpace(Element, degree);
    return describe('#dimension', function() {
      it('is a number', function() {
        return gl.dimension.should.be.a.number;
      });
      return it('is the square of degree', function() {
        var dimension;
        dimension = degree * degree;
        return gl.dimension.should.be.eql(dimension);
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
