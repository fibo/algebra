(function() {
  var AlgebraVector, RealElement, RealField, RealTensor, RealVector, algebra, minusOne, one, three, two, vector, zero;

  algebra = require('../index');

  AlgebraVector = algebra.AlgebraVector;

  RealElement = algebra.RealElement;

  RealField = algebra.RealField;

  RealTensor = algebra.RealTensor;

  RealVector = algebra.RealVector;

  vector = new RealVector(0, 0, 1);

  minusOne = new RealElement(-1);

  zero = new RealElement(0);

  one = new RealElement(1);

  two = new RealElement(2);

  three = new RealElement(3);

  describe('RealVector', function() {
    describe('Inheritance', function() {
      return it('is an AlgebraVector', function() {
        return vector.should.be.instanceOf(AlgebraVector);
      });
    });
    describe('Constructor', function() {
      it('has signature (v1, v2, ... vn)', function() {
        vector = new RealVector(zero, one);
        vector.should.be.instanceOf(RealVector);
        vector = new RealVector(zero, one, two);
        vector.should.be.instanceOf(RealVector);
        vector = new RealVector(zero, one, two, three);
        return vector.should.be.instanceOf(RealVector);
      });
      it('has signature ([v1, v2, ... vn])', function() {
        vector = new RealVector([one, minusOne]);
        vector.should.be.instanceOf(RealVector);
        vector = new RealVector([one, zero, minusOne]);
        return vector.should.be.instanceOf(RealVector);
      });
      return it('coerces numbers to elements', function() {
        vector = new RealVector(0, 1);
        vector.should.be.instanceOf(RealVector);
        vector = new RealVector([1, 0, -1]);
        return vector.should.be.instanceOf(RealVector);
      });
    });
    describe('Attributes', function() {
      describe('#field', function() {
        return it('is a RealField', function() {
          return vector.field.should.be.instanceOf(RealField);
        });
      });
      describe('#data', function() {
        return it('returns vector data', function() {
          var data, element, elements;
          elements = [one, two];
          vector = new RealVector(elements);
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
          vector = new RealVector(0, 1);
          vector.dimension.should.be.eql(2);
          vector = new RealVector([1, 0, -1]);
          return vector.dimension.should.be.eql(3);
        });
      });
    });
    return describe('Methods', function() {
      describe('#addition()', function() {
        return it('implements +', function() {
          var vector1, vector2;
          vector1 = new RealVector([2, -1]);
          vector2 = new RealVector([0, -1]);
          vector1.addition(vector2);
          return vector1.data.should.be.eql([2, -2]);
        });
      });
      return describe('#subtraction()', function() {
        return it('implements +', function() {
          var vector1, vector2;
          vector1 = new RealVector([5, 6]);
          vector2 = new RealVector([2, 3]);
          vector1.subtraction(vector2);
          return vector1.data.should.be.eql([3, 3]);
        });
      });
    });
  });

}).call(this);
