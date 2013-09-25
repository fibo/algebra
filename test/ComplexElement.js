var AlgebraElement, ComplexElement, ComplexField, algebra, complex, element, w, z;

algebra = require('../index');

AlgebraElement = algebra.AlgebraElement;

ComplexElement = algebra.ComplexElement;

ComplexField = algebra.ComplexField;

element = new ComplexElement();

complex = new ComplexField();

z = new ComplexElement([2, 1]);

w = new ComplexElement(2, 1);

describe('ComplexElement', function() {
  describe('Inheritance', function() {
    return it('is an AlgebraElement', function() {
      return element.should.be.instanceOf(AlgebraElement);
    });
  });
  describe('Constructor', function() {
    it('data should default to [1, 0]', function() {
      return element.data.should.eql(complex.one);
    });
    it('has signature ([number, number])', function() {
      return z.data.should.eql([2, 1]);
    });
    return it('has signature (number, number)', function() {
      return w.data.should.eql([2, 1]);
    });
  });
  return describe('Methods', function() {
    describe('#addition()', function() {
      it('implements +', function() {
        z.data = [2, 1];
        w.data = [-1, 4];
        z.addition(w);
        return z.data.should.eql([1, 5]);
      });
      return it('can be chained', function() {
        return z.addition(w).should.be.instanceOf(ComplexElement);
      });
    });
    describe('#add()', function() {
      return it('is an alias of #addition()', function() {
        return element.add.should.eql(element.addition);
      });
    });
    describe('#subtraction()', function() {
      it('implements -');
      return it('can be chained', function() {
        return z.subtraction(w).should.be.instanceOf(ComplexElement);
      });
    });
    describe('#sub()', function() {
      return it('is an alias of #subtraction()', function() {
        return element.sub.should.eql(element.subtraction);
      });
    });
    describe('#multiplication()', function() {
      it('implements *', function() {
        z.data = [2, 1];
        w.data = [-1, 0];
        z.multiplication(w);
        return z.data.should.eql([-2, -1]);
      });
      return it('can be chained', function() {
        return z.multiplication(w).should.be.instanceOf(ComplexElement);
      });
    });
    describe('#mul()', function() {
      return it('is an alias of #multiplication()', function() {
        return element.mul.should.eql(element.multiplication);
      });
    });
    describe('#division()', function() {
      it('implements /', function() {
        z.data = [-2, -1];
        w.data = [-1, 0];
        z.division(w);
        return z.data.should.eql([2, 1]);
      });
      return it('can be chained', function() {
        return z.division(w).should.be.instanceOf(ComplexElement);
      });
    });
    return describe('#div()', function() {
      return it('is an alias of #division()', function() {
        return element.div.should.eql(element.division);
      });
    });
  });
});
