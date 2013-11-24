(function() {
  var AlgebraElement, AlgebraField, RealElement, RealField, algebra, element, field, real;

  algebra = require('../index');

  AlgebraElement = algebra.AlgebraElement;

  AlgebraField = algebra.AlgebraField;

  RealElement = algebra.RealElement;

  RealField = algebra.RealField;

  field = new AlgebraField();

  element = new AlgebraElement(field);

  real = new RealField();

  describe('AlgebraElement', function() {
    describe('Constructor', function() {
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
      return it('defaults #data to field.one)', function() {
        field = real;
        element = new AlgebraElement(field);
        return element.data.should.eql(field.one);
      });
    });
    describe('Attributes', function() {
      describe('#data', function() {
        return it('returns element data', function() {
          var data;
          field = real;
          data = 6;
          element = new AlgebraElement(field, data);
          return element.data.should.eql(data);
        });
      });
      return describe('#field', function() {
        return it('returns element field', function() {
          var data;
          field = real;
          data = 5;
          element = new AlgebraElement(field, data);
          return element.field.should.eql(field);
        });
      });
    });
    return describe('Methods', function() {
      describe('#clone()', function() {
        return it('returns an element with the same data', function() {
          var data, element1, element2;
          data = 10;
          element1 = new RealElement(data);
          element2 = element1.clone();
          element2.should.be.instanceOf(RealElement);
          return element1.data.should.be.eql(element2.data);
        });
      });
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

}).call(this);
