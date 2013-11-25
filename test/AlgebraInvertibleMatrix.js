(function() {
  var AlgebraInvertibleMatrix, AlgebraMatrix, RealElement, algebra, x, y;

  algebra = require('../index');

  AlgebraMatrix = algebra.AlgebraMatrix;

  AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix;

  RealElement = algebra.RealElement;

  x = new RealElement(2);

  y = new RealElement(3);

  describe('AlgebraMatrix', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraInvertibleMatrix', function() {
        var Element, elements, matrix, order;
        Element = RealElement;
        elements = [x, y, y, x];
        order = 2;
        matrix = new AlgebraInvertibleMatrix(Element, order, elements);
        return matrix.should.be.instanceOf(AlgebraInvertibleMatrix);
      });
    });
    describe('Constructor', function() {
      it('has signature (Element, order)');
      return it('has signature (Element, order, elements)');
    });
    describe('Attributes', function() {
      describe('#order', function() {});
      return describe('#determinant', function() {
        return it('computes the determinant');
      });
    });
    return describe('Methods', function() {
      return describe('#inverse()', function() {
        return it('returns the inverse of the matrix');
      });
    });
  });

}).call(this);
