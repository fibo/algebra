var AlgebraVector, RealField, algebra, real;

algebra = require('../index.js');

AlgebraVector = algebra.AlgebraVector;

RealField = algebra.RealField;

real = new RealField();

describe('AlgebraVector', function() {
  describe('Constructor', function() {
    return it('has signature (field, elements)', function() {
      var elements, field, vector;
      field = real;
      elements = [1, 2];
      vector = new AlgebraVector(field, elements);
      return vector.should.be.instanceOf(AlgebraVector);
    });
  });
  return describe('Accessor', function() {
    return describe('dimension', function() {
      return it('returns vector dimension, that is the number of elements', function() {
        var elements, field, vector;
        field = real;
        elements = [1, 0, -1];
        vector = new AlgebraVector(field, elements);
        return vector.dimension.should.be.eql(3);
      });
    });
  });
});
