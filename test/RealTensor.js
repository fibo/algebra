var AlgebraTensor, RealElement, RealTensor, algebra, one, zero;

algebra = require('../index');

AlgebraTensor = algebra.AlgebraTensor;

RealElement = algebra.RealElement;

RealTensor = algebra.RealTensor;

zero = new RealElement(0);

one = new RealElement(1);

describe('RealTensor', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraTensor', function() {
      var elements, indices, tensor;
      indices = [1, 2];
      elements = [zero, one];
      tensor = new RealTensor(indices, elements);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
  });
  describe('Constructor', function() {});
  describe('Attributes', function() {});
  return describe('Methods', function() {});
});
