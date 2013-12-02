(function() {
  var AlgebraMatrix, RealElement, RealField, algebra, minusOne, one, two, zero;

  algebra = require('../index');

  AlgebraMatrix = algebra.AlgebraMatrix;

  RealElement = algebra.RealElement;

  RealField = algebra.RealField;

  one = new RealElement(1);

  two = new RealElement(2);

  zero = new RealElement(0);

  minusOne = new RealElement(-1);

  describe('AlgebraMatrix', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraTensor');
    });
    describe('Constructor', function() {
      return it('has signature (Element, dimensionArray, elements)');
    });
    describe('Attributes', function() {
      describe('#numberOfColumns', function() {
        return it('returns the number of columns');
      });
      return describe('#numberOfRows', function() {
        return it('returns the number of rows');
      });
    });
    return describe('Methods', function() {
      describe('#addition', function() {});
      return describe('#multiplication', function() {});
    });
  });

}).call(this);
