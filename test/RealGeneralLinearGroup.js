(function() {
  var AlgebraField, AlgebraInvertibleMatrix, GeneralLinearGroup, RealGeneralLinearGroup, algebra, degree, gl;

  algebra = require('../index');

  AlgebraField = algebra.AlgebraField;

  GeneralLinearGroup = algebra.GeneralLinearGroup;

  RealGeneralLinearGroup = algebra.RealGeneralLinearGroup;

  AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix;

  degree = 4;

  gl = new RealGeneralLinearGroup(degree);

  describe('RealGeneralLinearGroup', function() {
    describe('Inheritance', function() {
      return it('is a GeneralLinearGroup', function() {
        return gl.should.be.instanceOf(GeneralLinearGroup);
      });
    });
    describe('Constructor', function() {
      return it('has signature (degree)', function() {
        degree = 2;
        gl = new RealGeneralLinearGroup(degree);
        return gl.should.be.instanceOf(RealGeneralLinearGroup);
      });
    });
    describe('Attributes', function() {
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
        return it('is a constructor that returns an invertible matrix', function() {
          var matrix;
          matrix = new gl.Matrix();
          return matrix.should.be.instanceOf(AlgebraInvertibleMatrix);
        });
      });
      return describe('#containsMatrix()', function() {
        return it('checks that the given matrix belongs to this matrix space');
      });
    });
  });

}).call(this);
