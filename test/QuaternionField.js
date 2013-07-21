var AlgebraField, QuaternionField, algebra, quaternion;

algebra = require('../index.js');

AlgebraField = algebra.AlgebraField;

QuaternionField = algebra.QuaternionField;

quaternion = new QuaternionField();

describe('QuaterionField', function() {
  describe('inheritance', function() {
    return it('is an AlgebraField', function() {
      return quaternion.should.be["instanceof"](AlgebraField);
    });
  });
  describe('attributes', function() {
    describe('#one', function() {
      it('should be [1, 0, 0, 0]', function() {});
      return it('cannot be overridden', function() {});
    });
    return describe('#zero', function() {
      it('should be 0', function() {});
      return it('cannot be overridden', function() {});
    });
  });
  return describe('methods', function() {
    describe('#addition()', function() {
      return it('implements +', function() {});
    });
    return describe('#subtraction()', function() {
      return it('implements -', function() {});
    });
  });
});
