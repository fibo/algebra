var AlgebraField, algebra, element;

algebra = require('../index');

AlgebraField = algebra.AlgebraField;

element = new AlgebraField();

describe('AlgebraField', function() {
  describe('Constructor', function() {});
  describe('Attributes', function() {
    describe('#one()', function() {});
    return describe('#zero()', function() {});
  });
  return describe('Methods', function() {
    describe('#addition()', function() {
      return it('is abstract', function() {
        return element.addition.should.throwError();
      });
    });
    describe('#add()', function() {
      return it('is abstract', function() {
        return element.add.should.throwError();
      });
    });
    describe('#subtraction()', function() {
      return it('is abstract', function() {
        return element.subtraction.should.throwError();
      });
    });
    describe('#sub()', function() {
      return it('is abstract', function() {
        return element.sub.should.throwError();
      });
    });
    describe('#multiplication()', function() {
      return it('is abstract', function() {
        return element.multiplication.should.throwError();
      });
    });
    describe('#mul()', function() {
      return it('is abstract', function() {
        return element.mul.should.throwError();
      });
    });
    describe('#division()', function() {
      return it('is abstract', function() {
        return element.division.should.throwError();
      });
    });
    describe('#div()', function() {
      return it('is abstract', function() {
        return element.div.should.throwError();
      });
    });
    describe('#equal()', function() {
      return it('is abstract', function() {
        return element.equal.should.throwError();
      });
    });
    describe('#eq()', function() {
      return it('is abstract', function() {
        return element.eq.should.throwError();
      });
    });
    describe('#notEqual()', function() {
      return it('is abstract', function() {
        return element.notEqual.should.throwError();
      });
    });
    describe('#ne()', function() {
      return it('is abstract', function() {
        return element.ne.should.throwError();
      });
    });
    describe('#inversion()', function() {
      return it('is abstract', function() {
        return element.inversion.should.throwError();
      });
    });
    return describe('#inv()', function() {
      return it('is abstract', function() {
        return element.inv.should.throwError();
      });
    });
  });
});
