var AlgebraField, QuaternionField, algebra, quaternion;

algebra = require('../index.js');

AlgebraField = algebra.AlgebraField;

QuaternionField = algebra.QuaternionField;

quaternion = new QuaternionField();

describe('QuaternionField', function() {
  describe('inheritance', function() {
    return it('is an AlgebraField', function() {
      return quaternion.should.be["instanceof"](AlgebraField);
    });
  });
  describe('attributes', function() {
    describe('#one', function() {
      it('should be [1, 0, 0, 0]', function() {
        return quaternion.one.should.eql([1, 0, 0, 0]);
      });
      return it('cannot be overridden', function() {
        return (function() {
          return quaternion.one = [1, 1, 1, 1];
        }).should.throwError();
      });
    });
    return describe('#zero', function() {
      it('should be [0, 0, 0, 0]', function() {
        return quaternion.zero.should.eql([0, 0, 0, 0]);
      });
      return it('cannot be overridden', function() {
        return (function() {
          return quaternion.zero = [1, 1, 1, 1];
        }).should.throwError();
      });
    });
  });
  return describe('methods', function() {
    describe('#addition()', function() {
      return it('implements +', function() {
        return quaternion.addition([1, 2, 3, 4], [1, 1, 1, 1]).should.eql([2, 3, 4, 5]);
      });
    });
    describe('#subtraction()', function() {
      return it('implements -', function() {
        return quaternion.subtraction([1, 2, 3, 4], [1, 1, 1, 1]).should.eql([0, 1, 2, 3]);
      });
    });
    describe('#multiplication()', function() {
      return it('implements *', function() {});
    });
    return describe('#division()', function() {
      return it('implements /', function() {});
    });
  });
});
