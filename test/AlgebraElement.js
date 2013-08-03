var AlgebraElement, algebra, element;

algebra = require('../index.js');

AlgebraElement = algebra.AlgebraElement;

element = new AlgebraElement();

describe('AlgebraElement', function() {
  describe('constructor', function() {
    return it('has signature ()', function() {
      element = new AlgebraElement();
      return element.should.be.instanceOf(AlgebraElement);
    });
  });
  return describe('methods', function() {
    describe('#addition()', function() {
      return it('is abstract', function() {
        return element.addition.should.throwError();
      });
    });
    describe('#subtraction()', function() {
      return it('is abstract', function() {
        return element.subtraction.should.throwError();
      });
    });
    describe('#multiplication()', function() {
      return it('is abstract', function() {
        return element.multiplication.should.throwError();
      });
    });
    return describe('#division()', function() {
      return it('is abstract', function() {
        return element.division.should.throwError();
      });
    });
  });
});
