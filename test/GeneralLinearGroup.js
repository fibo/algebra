(function() {
  var AlgebraInvertibleMatrix, ComplexElement, GeneralLinearGroup, RealElement, algebra;

  algebra = require('../index');

  AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix;

  ComplexElement = algebra.ComplexElement;

  GeneralLinearGroup = algebra.GeneralLinearGroup;

  RealElement = algebra.RealElement;

  describe('GeneralLinearGroup', function() {
    describe('Constructor', function() {
      return it('has signature (Element, degree)', function() {
        var Element, Gl, degree;
        Element = RealElement;
        degree = 2;
        Gl = new GeneralLinearGroup(Element, degree);
        return Gl.should.be.instanceOf(GeneralLinearGroup);
      });
    });
    describe('Attributes', function() {
      var Element, Gl, degree;
      Element = ComplexElement;
      degree = 3;
      Gl = new GeneralLinearGroup(Element, degree);
      return describe('#dimension', function() {
        it('is a number');
        return it('is the square of degree');
      });
    });
    return describe('Methods', function() {
      var Element, Gl, degree;
      Element = RealElement;
      degree = 2;
      Gl = new GeneralLinearGroup(Element, degree);
      describe('#Matrix()', function() {
        return it('is a constructor');
      });
      return describe('#containsMatrix()', function() {
        return it('checks that the given matrix belongs to this matrix Gl');
      });
    });
  });

}).call(this);
