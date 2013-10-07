var AlgebraTensor, ComplexElement, ComplexField, RealElement, RealField, algebra, real, w, x, y, z;

algebra = require('../index');

AlgebraTensor = algebra.AlgebraTensor;

ComplexField = algebra.ComplexField;

ComplexElement = algebra.ComplexElement;

RealField = algebra.RealField;

RealElement = algebra.RealElement;

real = new RealField();

x = new RealElement(2);

y = new RealElement(-1);

z = new ComplexElement(1, 2);

w = new ComplexElement(5, -1);

describe('AlgebraTensor', function() {
  describe('Constructor', function() {
    it('has signature (Element, indices, elements)', function() {
      var Element, elements, indices, tensor;
      Element = ComplexElement;
      indices = [2, 4, 3];
      elements = [z, w, z, w, z, w, z, z, z, w, w, w, z, z, z, z, z, z, z, z, z, z, z, z];
      tensor = new AlgebraTensor(Element, indices, elements);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has signature (Element, indices)', function() {
      var Element, indices, tensor;
      Element = ComplexElement;
      indices = [2, 4];
      tensor = new AlgebraTensor(Element, indices);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('defaults #elements to Ricci tensor elements');
    it('has signature (Element)', function() {
      var Element, tensor;
      Element = ComplexElement;
      tensor = new AlgebraTensor(Element);
      return tensor.should.be.instanceOf(AlgebraTensor);
    });
    it('has default indices [0]', function() {
      var tensor;
      tensor = new AlgebraTensor(ComplexElement);
      return tensor.indices.should.eql([0]);
    });
    it('checks signature', function() {
      return (function() {
        return new AlgebraTensor();
      }).should.throwError();
    });
    it('requires #Element is an AlgebraElement class', function() {
      return (function() {
        var tensor;
        return tensor = new AlgebraTensor('not an AlgebraElement class');
      }).should.throwError();
    });
    it('coerces data to elements');
    return it('requires #elements belongs to #Element field');
  });
  describe('Attributes', function() {
    describe('#indices', function() {
      return it('returns tensor indices');
    });
    describe('#data', function() {
      return it('returns tensor elements data', function() {
        var Element, data, element, elements, indices, tensor;
        Element = RealElement;
        indices = [2, 2];
        elements = [x, y, y, x];
        tensor = new AlgebraTensor(Element, indices, elements);
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
      return it('returns tensor elements', function() {
        var Element, elements, indices, tensor;
        Element = RealElement;
        indices = [2, 2];
        elements = [x, y, y, x];
        tensor = new AlgebraTensor(Element, indices, elements);
        return tensor.elements.should.eql(elements);
      });
    });
  });
  return describe('Methods', function() {
    return describe('#addition()', function() {
      it('implements +', function() {
        var Element, indices, t, u;
        Element = RealElement;
        indices = [3];
        t = new AlgebraTensor(Element, indices, [0, 1, 2]);
        u = new AlgebraTensor(Element, indices, [1, 1, 1]);
        t.addition(u);
        return t.data.should.eql([1, 2, 3]);
      });
      return it('can be chained', function() {
        var Element, indices, t, u;
        Element = RealElement;
        indices = [2];
        t = new AlgebraTensor(Element, indices, [0, 1]);
        u = new AlgebraTensor(Element, indices, [1, 1]);
        return t.addition(u).should.be.instanceOf(AlgebraTensor);
      });
    });
  });
});
