var AlgebraTensor, ComplexElement, ComplexField, RealElement, RealField, algebra, complex, real, w, z;

algebra = require('../index');

AlgebraTensor = algebra.AlgebraTensor;

ComplexField = algebra.ComplexField;

ComplexElement = algebra.ComplexElement;

RealField = algebra.RealField;

RealElement = algebra.RealElement;

complex = new ComplexField();

real = new RealField();

z = new ComplexElement(1, 2);

w = new ComplexElement(5, -1);

describe('AlgebraTensor', function() {
  describe('Constructor', function() {
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
    it('defaults #elements to Ricci tensor elements', function() {});
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
    it('checks signature', function() {
      return (function() {
        return new AlgebraTensor();
      }).should.throwError();
    });
    it('requires #field is instance of AlgebraField', function() {
      return (function() {
        var tensor;
        return tensor = new AlgebraTensor('not a field');
      }).should.throwError();
    });
    it('coerces #elements from AlgebraElement', function() {
      var elements, field, indices, tensor, x, y;
      x = new RealElement(2);
      y = new RealElement(4);
      field = real;
      indices = [3];
      elements = [x, y, 8];
      tensor = new AlgebraTensor(field, indices, elements);
      tensor.should.be.instanceOf(AlgebraTensor);
      tensor.elements[0].should.eql(x.data);
      tensor.elements[1].should.eql(y.data);
      return tensor.elements[2].should.eql(8);
    });
    return it('requires #elements are valid', function() {
      var elements, field, indices, tensor, x, y;
      x = new RealElement(2);
      y = 'foo';
      field = real;
      indices = [2];
      elements = [x, y];
      return tensor = new AlgebraTensor(field, indices, elements);
    });
  });
  describe('Attributes', function() {
    describe('#indices', function() {});
    return describe('#elements', function() {});
  });
  return describe('Methods', function() {});
});
