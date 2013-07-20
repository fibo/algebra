var AlgebraElement, algebra, element;

algebra = require('../index.js');

AlgebraElement = algebra.AlgebraElement;

element = new AlgebraElement();

describe('AlgebraElement', function() {
  describe('#addition()', function() {
    return it('is abstract', function() {
      return element.addition.should.throwError();
    });
  });
  return describe('#subtraction()', function() {
    return it('is abstract', function() {
      return element.subtraction.should.throwError();
    });
  });
});
