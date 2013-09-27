var AlgebraTensor, ComplexElement, ComplexField, RealElement, RealField, algebra, complex, real, w, x, y, z;

algebra = require('../index');

AlgebraTensor = algebra.AlgebraTensor;

ComplexField = algebra.ComplexField;

ComplexElement = algebra.ComplexElement;

RealField = algebra.RealField;

RealElement = algebra.RealElement;

complex = new ComplexField();

real = new RealField();

x = new RealElement(2);

y = new RealElement(-1);

z = new ComplexElement(1, 2);

w = new ComplexElement(5, -1);

describe('AlgebraTensor', function() {
  describe('Constructor', function() {
    it('has signature (field, indices, elements)', function() {
      var elements, indices, tensor;
      elements = [z, w, z, w, z, w, z, z, z, w, w, w, z, z, z, z, z, z, z, z, z, z, z, z];
      indices = [2, 4, 3];
      tensor = new AlgebraTensor(complex, indices, elements);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has signature (field, indices)', function() {
      var indices, tensor;
      indices = [2, 4];
      tensor = new AlgebraTensor(complex, indices);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('defaults #elements to Ricci tensor elements', function() {});
    it('has signature (field)', function() {
      var tensor;
      tensor = new AlgebraTensor(complex);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has default indices [0]', function() {
      var tensor;
      tensor = new AlgebraTensor(complex);
      return tensor.indices.should.eql([0]);
    });
    it('checks signature', function() {
      return (function() {
        return new AlgebraTensor();
      }).should.throwError();
    });
    it('requires #field is instance of AlgebraField', function() {
      return (function() {
        var tensor;
        return tensor = new AlgebraTensor('not a field');
      }).should.throwError();
    });
    it('coerces data to elements', function() {
      var data, elements, field, indices, num, tensor;
      field = real;
      indices = [3];
      data = [2, 4, 8];
      elements = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          num = data[_i];
          _results.push(new RealElement(num));
        }
        return _results;
      })();
      tensor = new AlgebraTensor(field, indices, elements);
      tensor.should.be.instanceOf(AlgebraTensor);
      return tensor.elements.should.eql(elements);
    });
    return it('requires #elements belongs to field');
  });
  describe('Attributes', function() {
    describe('#indices', function() {
      return it('returns tensor indices');
    });
    describe('#data', function() {
      return it('returns tensor elements data', function() {
        var data, element, elements, field, indices, tensor;
        field = real;
        indices = [2, 2];
        elements = [x, y, y, x];
        tensor = new AlgebraTensor(field, indices, elements);
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
        return tensor.data.should.eql(data);
      });
    });
    describe('#field', function() {
      return it('returns tensor field');
    });
    return describe('#elements', function() {
      return it('returns tensor elements');
    });
  });
  return describe('Methods', function() {
    return describe('#addition()', function() {
      it('implements +');
      return it('can be chained');
    });
  });
});
