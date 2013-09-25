var AlgebraTensor, RealTensor, algebra;

algebra = require('../index');

AlgebraTensor = algebra.AlgebraTensor;

RealTensor = algebra.RealTensor;

describe('RealTensor', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraTensor', function() {
      var elements, indices, tensor;
      indices = [1, 2];
      elements = [0, 1];
      tensor = new RealTensor(indices, elements);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
  });
  describe('Constructor', function() {});
  describe('Attributes', function() {});
  return describe('Methods', function() {});
});
