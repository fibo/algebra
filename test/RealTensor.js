var AlgebraTensor, RealTensor, algebra, tensor;

algebra = require('../index.js');

AlgebraTensor = algebra.AlgebraTensor;

RealTensor = algebra.RealTensor;

tensor = new RealTensor();

describe('RealTensor', function() {
  return describe('inheritance', function() {
    return it('is an AlgebraTensor', function() {
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
  });
});
