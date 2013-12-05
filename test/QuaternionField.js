(function() {
  var AlgebraField, QuaternionField, algebra, quaternion;

  algebra = require('../index');

  AlgebraField = algebra.AlgebraField;

  QuaternionField = algebra.QuaternionField;

  quaternion = new QuaternionField();

  describe('QuaternionField', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraField', function() {
        return quaternion.should.be["instanceof"](AlgebraField);
      });
    });
    describe('Constructor', function() {
      return it('has signature ()', function() {
        return quaternion.should.be.instanceOf(AlgebraField);
      });
    });
    describe('Attributes', function() {
      describe('#one', function() {
        it('should be [1, 0, 0, 0]', function() {
          return quaternion.one.should.eql([1, 0, 0, 0]);
        });
        return it('cannot be overridden');
      });
      return describe('#zero', function() {
        it('should be [0, 0, 0, 0]', function() {
          return quaternion.zero.should.eql([0, 0, 0, 0]);
        });
        return it('cannot be overridden');
      });
    });
    describe('Methods', function() {
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
        return it('implements *');
      });
      return describe('#division()', function() {
        return it('implements /');
      });
    });
    return describe('Methods', function() {});
  });

}).call(this);
