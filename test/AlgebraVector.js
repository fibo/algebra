(function() {
  var AlgebraVector, RealElement, RealField, algebra, minusOne, one, two, zero;

  algebra = require('../index');

  AlgebraVector = algebra.AlgebraVector;

  RealElement = algebra.RealElement;

  RealField = algebra.RealField;

  one = new RealElement(1);

  two = new RealElement(2);

  zero = new RealElement(0);

  minusOne = new RealElement(-1);

  describe('AlgebraVector', function() {
    describe('Constructor', function() {
      return it('has signature (field, elements)', function() {
        var Element, elements, vector;
        Element = RealElement;
        elements = [one, two];
        vector = new AlgebraVector(Element, elements);
        return vector.should.be.instanceOf(AlgebraVector);
      });
    });
    return describe('Attributes', function() {
      describe('#data', function() {
        return it('returns vector data', function() {
          var Element, data, element, elements, vector;
          Element = RealElement;
          elements = [one, two];
          vector = new AlgebraVector(Element, elements);
          data = [];
          data = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = elements.length; _i < _len; _i++) {
              element = elements[_i];
              _results.push(element.data);
            }
            return _results;
          })();
          return vector.data.should.eql(data);
        });
      });
      return describe('#dimension', function() {
        return it('returns vector dimension, that is the number of elements', function() {
          var Element, elements, vector;
          Element = RealElement;
          elements = [one, zero, minusOne];
          vector = new AlgebraVector(Element, elements);
          return vector.dimension.should.be.eql(3);
        });
      });
    });
  });

}).call(this);
