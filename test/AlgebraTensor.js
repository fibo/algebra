var AlgebraTensor, ComplexElement, ComplexField, algebra, complex, w, z;

algebra = require('../index.js');

AlgebraTensor = algebra.AlgebraTensor;

ComplexField = algebra.ComplexField;

ComplexElement = algebra.ComplexElement;

complex = new ComplexField();

z = new ComplexElement(1, 2);

w = new ComplexElement(5, -1);

describe('AlgebraTensor', function() {
  describe('constructor', function() {
    it('has signature (field, indices, elements)', function() {
      var elements, indices, tensor;
      elements = [z, w, z, w, z, w, z, z, z, w, w, w, z, z, z, z, z, z, z, z, z, z, z, z];
      indices = [2, 4, 3];
      tensor = new AlgebraTensor(complex, indices, elements);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has signature (field, indices)', function() {
      var indices, tensor;
      indices = [2, 4];
      tensor = new AlgebraTensor(complex, indices);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has signature (field)', function() {
      var tensor;
      tensor = new AlgebraTensor(complex);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has default indices [0]', function() {
      var tensor;
      tensor = new AlgebraTensor(complex);
      return tensor.indices.should.eql([0]);
    });
    return it('checks signature', function() {
      return (function() {
        return new AlgebraTensor();
      }).should.throwError();
    });
  });
  return describe('attributes', function() {
    describe('#indices', function() {});
    return describe('#elements', function() {});
  });
});
