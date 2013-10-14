var AlgebraField, AlgebraTensorSpace, AlgebraVector, AlgebraVectorSpace, algebra;

algebra = require('../index');

AlgebraField = algebra.AlgebraField;

AlgebraVector = algebra.AlgebraVector;

AlgebraVectorSpace = algebra.AlgebraVectorSpace;

AlgebraTensorSpace = algebra.AlgebraTensorSpace;

describe('AlgebraVectorSpace', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraTensorSpace');
  });
  describe('Constructor', function() {
    it('has signature (Vector)', function() {});
    return it('has signature (Element, dimension)', function() {});
  });
  describe('Attributes', function() {
    return describe('#dimension', function() {});
  });
  return describe('Methods', function() {
    describe('#Vector()', function() {
      return it('is a constructor');
    });
    return describe('#containsVector()', function() {
      return it('checks that the given vector belongs to this vector space');
    });
  });
});
