var AlgebraField, GeneralLinearGroup, RealField, RealGeneralLinearGroup, algebra;

algebra = require('../index');

AlgebraField = algebra.AlgebraField;

GeneralLinearGroup = algebra.GeneralLinearGroup;

RealGeneralLinearGroup = algebra.RealGeneralLinearGroup;

RealField = algebra.RealField;

describe('RealGeneralLinearGroup', function() {
  describe('Inheritance', function() {
    return it('is a GeneralLinearGroup', function() {
      var degree, gl;
      degree = 2;
      gl = new RealGeneralLinearGroup(degree);
      return gl.should.be.instanceOf(GeneralLinearGroup);
    });
  });
  describe('Constructor', function() {
    return it('has signature (degree)', function() {
      var degree, gl;
      degree = 2;
      gl = new RealGeneralLinearGroup(degree);
      return gl.should.be.instanceOf(RealGeneralLinearGroup);
    });
  });
  describe('Attributes', function() {
    var degree, gl;
    degree = 4;
    gl = new RealGeneralLinearGroup(degree);
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
      return it('returns the real field', function() {
        return gl.field.should.be.instanceOf(RealField);
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
