(function() {
  var AlgebraField, RealField, algebra, real;

  algebra = require('../index');

  AlgebraField = algebra.AlgebraField;

  RealField = algebra.RealField;

  real = new RealField();

  describe('RealField', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraField', function() {
        return real.should.be.instanceOf(AlgebraField);
      });
    });
    describe('Constructor', function() {});
    describe('Attributes', function() {
      describe('#one', function() {
        it('should be 1', function() {
          return real.one.should.eql(1);
        });
        return it('cannot be overridden');
      });
      return describe('#zero', function() {
        it('should be 0', function() {
          return real.zero.should.eql(0);
        });
        return it('cannot be overridden');
      });
    });
    return describe('Methods', function() {
      describe('#addition()', function() {
        return it('implements +', function() {
          return real.addition(4, 3).should.eql(7);
        });
      });
      describe('#subtraction()', function() {
        return it('implements -', function() {
          return real.subtraction(4, 3).should.eql(1);
        });
      });
      describe('#multiplication()', function() {
        return it('implements *', function() {
          return real.multiplication(4, 3).should.eql(12);
        });
      });
      return describe('#division()', function() {
        return it('implements /', function() {
          return real.division(12, 3).should.eql(4);
        });
      });
    });
  });

}).call(this);
