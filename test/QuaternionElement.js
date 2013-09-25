var AlgebraElement, QuaternionElement, QuaternionField, algebra, element, quaternion, w, z;

algebra = require('../index');

AlgebraElement = algebra.AlgebraElement;

QuaternionElement = algebra.QuaternionElement;

QuaternionField = algebra.QuaternionField;

element = new QuaternionElement();

quaternion = new QuaternionField();

z = new QuaternionElement([2, 1]);

w = new QuaternionElement(2, 1);

describe('QuaternionElement', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraElement', function() {
      return element.should.be.instanceOf(AlgebraElement);
    });
  });
  describe('Constructor', function() {
    it('data should default to [1, 0, 0, 0]', function() {
      return element.data.should.eql([1, 0, 0, 0]);
    });
    it('has signature ([number, number])', function() {});
    return it('has signature (number, number)', function() {});
  });
  describe('Attributes', function() {});
  return describe('Methods', function() {
    describe('#addition()', function() {
      it('implements +');
      return it('can be chained');
    });
    describe('#add()', function() {
      return it('is an alias of #addition()', function() {
        return element.add.should.eql(element.addition);
      });
    });
    describe('#subtraction()', function() {
      it('implements -');
      return it('can be chained');
    });
    describe('#sub()', function() {
      return it('is an alias of #subtraction()');
    });
    describe('#multiplication()', function() {
      it('implements *');
      return it('can be chained');
    });
    describe('#mul()', function() {
      return it('is an alias of #multiplication()', function() {
        return element.mul.should.eql(element.multiplication);
      });
    });
    return describe('#div()', function() {
      return it('is an alias of #division()', function() {
        return element.div.should.eql(element.division);
      });
    });
  });
});
