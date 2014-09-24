

var algebra = require('..')

var AlgebraElement = algebra.AlgebraElement
  , RealElement = algebra.RealElement

var element = new RealElement()
  , x = new RealElement(2)
  , y = new RealElement(-10)

describe('RealElement', function() {
  describe('Inheritance', function() {
    it('is an AlgebraElement', function() {
      element.should.be.instanceOf(AlgebraElement)
    })
  })

  describe('Constructor', function() {
    it('has signature (number)', function() {
      x.data.should.eql(2)
      y.data.should.eql(-10)
    })

    it('data defaults to 1', function() {
      element.data.should.eql(1)
    })

    it('requires data is a number', function() {
      (function() {
        element = new RealElement('not a number')
      }).should.throwError()
     })
  })

    return describe('Methods', function() {
      describe('#addition()', function() {
        it('implements +', function() {
          x.data = 2
          y.data = -10
          x.addition(y)
          x.data.should.equal(-8)
        });
        return it('can be chained', function() {
          return x.addition(y).should.be.instanceOf(RealElement);
        });
      });
      describe('#add()', function() {
        return it('is an alias of #addition()', function() {
          return element.add.should.eql(element.addition);
        });
      });
      describe('#subtraction()', function() {
        it('implements -', function() {
          x.data = 8;
          y.data = 4;
          y.subtraction(x);
          return y.data.should.equal(-4);
        });
        return it('can be chained', function() {
          return x.subtraction(y).should.be.instanceOf(RealElement);
        });
      });
      describe('#sub()', function() {
        return it('is an alias of #subtraction()', function() {
          return element.sub.should.eql(element.subtraction);
        });
      });
      describe('#multiplication()', function() {
        it('implements *', function() {
          x.data = 2;
          y.data = -10;
          x.multiplication(y);
          return x.data.should.eql(-20);
        });
        return it('can be chained', function() {
          return x.multiplication(y).should.be.instanceOf(RealElement);
        });
      });
      describe('#mul()', function() {
        return it('is an alias of #multiplication()', function() {
          return element.mul.should.eql(element.multiplication);
        });
      });
      describe('#division()', function() {
        it('implements /', function() {
          x.data = 10;
          y.data = 20;
          x.division(y);
          return x.data.should.eql(0.5);
        });
        return it('can be chained', function() {
          return x.division(y).should.be.instanceOf(RealElement);
        });
      });
      return describe('#div()', function() {
        return it('is an alias of #division()', function() {
          return element.div.should.eql(element.division);
        });
      });
    });
  });
