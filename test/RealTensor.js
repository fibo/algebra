(function() {
  var AlgebraTensor, RealElement, RealField, RealTensor, algebra, elements, indices, one, tensor, zero;

  algebra = require('../index');

  AlgebraTensor = algebra.AlgebraTensor;

  RealField = algebra.RealField;

  RealElement = algebra.RealElement;

  RealTensor = algebra.RealTensor;

  zero = new RealElement(0);

  one = new RealElement(1);

  indices = [1, 2];

  elements = [zero, one];

  tensor = new RealTensor(indices, elements);

  describe('RealTensor', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraTensor', function() {
        return tensor.should.be.instanceOf(AlgebraTensor);
      });
    });
    describe('Constructor', function() {
      it('has signature (indices, elements)', function() {
        tensor = new RealTensor(indices, elements);
        return tensor.should.be.instanceOf(RealTensor);
      });
      return it('has signature (indices)', function() {
        tensor = new RealTensor(indices);
        return tensor.should.be.instanceOf(RealTensor);
      });
    });
    return describe('Attributes', function() {
      return describe('#field', function() {
        return it('is the real field', function() {
          return tensor.field.should.be.instanceOf(RealField);
        });
      });
    });
  });

}).call(this);
