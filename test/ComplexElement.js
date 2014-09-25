
var algebra = require('..')

var AlgebraElement = algebra.AlgebraElement
  , ComplexElement = algebra.ComplexElement
  , ComplexField   = algebra.ComplexField

var element = new ComplexElement()

var z = new ComplexElement([2, 1])
  , w = new ComplexElement([2, 1])

  describe('ComplexElement', function() {
    describe('Inheritance', function() {
      it('is an AlgebraElement', function() {
        element.should.be.instanceOf(AlgebraElement);
      });
    });

    describe('Constructor', function() {
      it('defaults data to [1, 0]', function() {
        element.data.should.eql([1, 0]);
      });

      it('has signature ([number, number])', function() {
        z.data.should.eql([2, 1]);
      });

      it('has signature (number, number)', function() {
        w.data.should.eql([2, 1]);
      });
    });

    describe('Methods', function() {
      describe('conjugation()', function() {
        it('applies conjugation', function() {
          z.data = [2, 1];
          z.conjugation();
          z.data.should.eql([2, -1]);
        });

        it('can be chained', function() {
          z.conjugation().should.be.instanceOf(ComplexElement);
        });
      });

      describe('conj()', function() {
        it('is an alias of conjugation()', function() {
          z.conj.should.eql(z.conjugation);
        });
      });

      describe('#addition()', function() {
        it('implements +', function() {
          z.data = [2, 1];
          w.data = [-1, 4];
          z.addition(w);
          z.data.should.eql([1, 5]);
        });
        it('can be chained', function() {
          z.addition(w).should.be.instanceOf(ComplexElement);
        });
      });

      describe('#add()', function() {
        it('is an alias of #addition()', function() {
          element.add.should.eql(element.addition);
        });
      });

      describe('#subtraction()', function() {
        it('implements -', function() {
          z.data = [8, 1];
          w.data = [4, 2];
          z.subtraction(w);
          z.data.should.eql([4, -1]);
        });
        it('can be chained', function() {
          z.subtraction(w).should.be.instanceOf(ComplexElement);
        });
      });

      describe('#sub()', function() {
        it('is an alias of #subtraction()', function() {
          element.sub.should.eql(element.subtraction);
        });
      });

      describe('#multiplication()', function() {
        it('implements *', function() {
          z.data = [2, 1];
          w.data = [-1, 0];
          z.multiplication(w);
          z.data.should.eql([-2, -1]);
        });

        it('can be chained', function() {
          z.multiplication(w).should.be.instanceOf(ComplexElement);
        });
      });

      describe('#mul()', function() {
        it('is an alias of #multiplication()', function() {
          element.mul.should.eql(element.multiplication);
        });
      });

      describe('#division()', function() {
        it('implements /', function() {
          z.data = [-2, -1];
          w.data = [-1, 0];
          z.division(w);
          z.data.should.eql([2, 1]);
        });

        it('can be chained', function() {
          z.division(w).should.be.instanceOf(ComplexElement);
        });
      });

      describe('#div()', function() {
        it('is an alias of #division()', function() {
          element.div.should.eql(element.division);
        });
      });
    });
  });
