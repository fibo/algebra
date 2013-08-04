var AlgebraElement, AlgebraField, RealField, algebra, element, field;

algebra = require('../index.js');

AlgebraElement = algebra.AlgebraElement;

AlgebraField = algebra.AlgebraField;

RealField = algebra.RealField;

field = new AlgebraField();

element = new AlgebraElement(field);

describe('AlgebraElement', function() {
  describe('constructor', function() {
    it('has signature (field, data)', function() {
      var data;
      field = new AlgebraField();
      data = 1;
      element = new AlgebraElement(field, data);
      return element.should.be.instanceOf(AlgebraElement);
    });
    it('has signature (field)', function() {
      field = new AlgebraField();
      element = new AlgebraElement(field);
      return element.should.be.instanceOf(AlgebraElement);
    });
    it('checks #field is an AlgebraField)', function() {
      return (function() {
        return element = new AlgebraElement('not a field');
      }).should.throwError();
    });
    return it('defaults #data to field.one)', function() {});
  });
  return describe('methods', function() {
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
    return describe('#div()', function() {
      return it('is abstract', function() {
        return element.div.should.throwError();
      });
    });
  });
});
