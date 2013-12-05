(function() {
  var AlgebraField, ComplexField, algebra, complex;

  algebra = require('../index');

  AlgebraField = algebra.AlgebraField;

  ComplexField = algebra.ComplexField;

  complex = new ComplexField();

  describe('ComplexField', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraField', function() {
        return complex.should.be.instanceOf(AlgebraField);
      });
    });
    describe('Constructor', function() {
      return it('has signature ()', function() {
        return complex.should.be.instanceOf(AlgebraField);
      });
    });
    describe('Attributes', function() {
      describe('#one', function() {
        it('should be [1, 0]', function() {
          return complex.one.should.eql([1, 0]);
        });
        return it('cannot be overridden');
      });
      return describe('#zero', function() {
        it('should be [0, 0]', function() {
          return complex.zero.should.eql([0, 0]);
        });
        return it('cannot be overridden');
      });
    });
    return describe('Methods', function() {
      describe('#addition()', function() {
        return it('implements +', function() {
          return complex.addition([1, 4], [-1, 1]).should.eql([0, 5]);
        });
      });
      describe('#subtraction()', function() {
        return it('implements -', function() {
          return complex.subtraction([2, 3], [2, -5]).should.eql([0, 8]);
        });
      });
      describe('#multiplication()', function() {
        return it('implements *', function() {
          complex.multiplication([2, 1], [2, 0]).should.eql([4, 2]);
          return complex.multiplication([2, 1], [2, -1]).should.eql([5, 0]);
        });
      });
      describe('#inversion()', function() {
        return it('implements ^-1', function() {
          return complex.inversion([2, 0]).should.eql([.5, 0]);
        });
      });
      describe('#division()', function() {
        return it('implements /', function() {
          return complex.division([5, 0], [2, 1]).should.eql([2, -1]);
        });
      });
      describe('#conjugation()', function() {
        return it('returns the conjugation of a complex number', function() {
          return complex.conjugation([2, 1]).should.eql([2, -1]);
        });
      });
      describe('#norm()', function() {
        return it('returns the norm of a complex number', function() {
          return complex.norm([2, 1]).should.eql(5);
        });
      });
      describe('#equal()', function() {
        return it('returns true if two complexes are equal', function() {
          return complex.equal([0, 1], [0, 1]).should.be["true"];
        });
      });
      return describe('#notEqual()', function() {
        return it('returns true if two complexes are not equal', function() {
          return complex.notEqual([0, 1], [1, 1]).should.be["true"];
        });
      });
    });
  });

}).call(this);
