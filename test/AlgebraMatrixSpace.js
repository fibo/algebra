(function() {
  var AlgebraField, AlgebraMatrixSpace, AlgebraTensorSpace, RealElement, algebra;

  algebra = require('../index');

  AlgebraField = algebra.AlgebraField;

  AlgebraMatrixSpace = algebra.AlgebraMatrixSpace;

  AlgebraTensorSpace = algebra.AlgebraTensorSpace;

  RealElement = algebra.RealElement;

  describe('AlgebraMatrixSpace', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraTensorSpace', function() {
        var Element, degree, space;
        Element = RealElement;
        degree = 2;
        space = new AlgebraMatrixSpace(Element, degree);
        return space.should.be.instanceOf(AlgebraTensorSpace);
      });
    });
    describe('Constructor', function() {
      it('has signature (Element, degree)', function() {});
      return it('has signature (Element, [numRows, numColumns])', function() {
        var Element, mXn, space;
        Element = RealElement;
        mXn = [2, 3];
        space = new AlgebraMatrixSpace(Element, mXn);
        return space.should.be.instanceOf(AlgebraMatrixSpace);
      });
    });
    describe('Attributes', function() {
      var Element, mXn, space;
      Element = RealElement;
      mXn = [2, 3];
      space = new AlgebraMatrixSpace(Element, mXn);
      return describe('#dimension', function() {
        it('is a number', function() {
          return space.dimension.should.be.a.number;
        });
        return it('is the numRows by numColumns', function() {
          var dimension;
          dimension = mXn[0] * mXn[1];
          return space.dimension.should.be.eql(dimension);
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

}).call(this);
