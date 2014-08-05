
var algebra  = require('../index')
  , inherits = require('inherits')
  , should   = require('should')

var AlgebraField = algebra.AlgebraField

// Boolean Algebra
function Boole () {
  this.addition = function (a, b) { return a && b }
  this.subtraction = function (a, b) { return a && (! b) }
  this.multiplication = function (a, b) { return a || b }
  this.division = function (a, b) { return a || (! b) }
  this.equal = function (a, b) { return a === b }

  AlgebraField.call(this, false, true)
}

inherits(Boole, AlgebraField)

var field = new Boole()

  describe('AlgebraField', function() {
    describe('add()', function() {
      it('is an alias of addition', function() {
        field.addition.should.be.Function
      })
    })
  /*
  describe('Attributes', function() {
    describe('one()', function() {});
    describe('#zero()', function() {});
        return it('cannot be overridden')
  });
  return describe('Methods', function() {
    describe('#addition()', function() {
      return it('is abstract', function() {
        return element.addition.should.throwError();
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
    describe('#div()', function() {
      return it('is abstract', function() {
        return element.div.should.throwError();
      });
    });
    describe('#equal()', function() {
      return it('is abstract', function() {
        return element.equal.should.throwError();
      });
    });
    describe('#eq()', function() {
      return it('is abstract', function() {
        return element.eq.should.throwError();
      });
    });
    describe('#notEqual()', function() {
      return it('is abstract', function() {
        return element.notEqual.should.throwError();
      });
    });
    describe('#ne()', function() {
      return it('is abstract', function() {
        return element.ne.should.throwError();
      });
    });
    describe('#inversion()', function() {
      return it('is abstract', function() {
        return element.inversion.should.throwError();
      });
    });
    return describe('#inv()', function() {
      return it('is abstract', function() {
        return element.inv.should.throwError();
      });
    });
  });
*/
})

