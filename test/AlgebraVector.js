var AlgebraVector, RealField, algebra, real, vector;

algebra = require('../index.js');

AlgebraVector = algebra.AlgebraVector;

RealField = algebra.RealField;

real = new RealField();

vector = new AlgebraVector(real, [1, 2]);

describe('AlgebraVector', function() {
  return describe('constructor', function() {
    return it('has signature (field, elements)');
  });
});
