var AlgebraTensor, RealTensor, algebra;

algebra = require('../index.js');

AlgebraTensor = algebra.AlgebraTensor;

RealTensor = algebra.RealTensor;

describe('RealTensor', function() {
  return describe('inheritance', function() {
    return it('is an AlgebraTensor', function() {
      var elements, indices, tensor;
      indices = [1, 2];
      elements = [0, 1];
      tensor = new RealTensor(indices, elements);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
  });
});
