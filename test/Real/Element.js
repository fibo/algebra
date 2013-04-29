
var assert  = require('assert')
var algebra = require('../../index.js')

var Element     = algebra.Element
var RealElement = algebra.Real.Element
var RealField   = algebra.Real.Field

var n = new RealElement(0)

describe('RealElement', function () {
  describe('Constructor', function () {
    it('accepts a number as single argument', function () {
      var ten = new RealElement(10)
      assert.ok(ten instanceof RealElement)
    })
  })

  describe('Inheritance', function () {
    it('is an Element', function () {
      assert.ok(n instanceof Element)
    })
  })

  describe('Methods', function () {
    describe('addition()', function () {
      it('implements the addition operator', function () {
        var x = new RealElement(2)
          , y = new RealElement(3)
   
        x.addition(y)
   
        assert.equal(x.getData(), 5)
      })
   
      it('coerces number type', function () {
        var x = new RealElement(2)
   
        x.addition(3)
   
        assert.equal(x.getData(), 5)
      })
   
      it('can be chained', function () {
        var x = new RealElement(-1)
        assert.ok(x.addition(2).addition(x) instanceof RealElement)
      })
    })

    describe('add()', function () {
      it('is an alias of addition()', function () {
        assert.ok(n.add === n.addition) 
      })
    })

    describe('clone()', function () {
      it('returns a copy of the object', function () {
        var x = new RealElement(-15)
          , y = x.clone()
   
        assert.ok(y instanceof RealElement)
   
        assert.ok(x.equal(y))
   
        assert.ok(x !== y)
      })
    })

    describe('division()', function () {
      it('implements the division operator', function () {
        var x = new RealElement(20)
        var y = new RealElement(4)
   
        x.division(y)
   
        assert.equal(x.getData(), 5)
      })
   
      it('coerces number type', function () {
        var x = new RealElement(15)
   
        x.division(3)
   
        assert.equal(x.getData(), 5)
      })
   
      it('can be chained', function () {
        var x = new RealElement(8)
   
        x.division(2).division(4)
   
        assert.equal(x.getData(), 1)
      })
    })

    describe('div()', function () {
      it('is an alias of division()', function () {
        assert.ok(element.div === element.division) 
      })
    })
   
    describe('equal()', function () {
      it('returns true if two elements are equal', function () {
        var x = new RealElement(-1)
        var y = new RealElement(-1)
   
        assert.ok(x.equal(y))
        assert.ok(y.equal(x))
      })
   
      it('corces number type', function () {
        var x = new RealElement(-1)
        assert.ok(x.equal(-1))
      })
   
      it('has reflection property', function () {
        var x = new RealElement(2.7)
        assert.ok(x.equal(x))
      })
    })
   
    describe('eq()', function () {
      it('is an alias of equal()', function () {
        assert.ok(n.eq === n.equal)
      })
    })
   
    describe('getData()', function () {
      it('returns the real number', function () {
        var x = new RealElement(2.71)
   
        assert.equal(x.getData(), 2.71)
      })
    })

    describe('inv()', function () {
      it('is an alias of inversion()', function () {
        assert.ok(n.inv === n.inversion) 
      })
    })

    describe('is0()', function () {
      it('is an alias of isZero()', function () {
        assert.ok(n.is0 === n.isZero) 
      })
    })

    describe('is1()', function () {
      it('is an alias of isOne()', function () {
        assert.ok(n.is1 === n.isOne) 
      })
    })

    describe('isNotOne()', function () {
      it('returns true if element is not one, false otherwise', function () {
        var x = new RealElement(10)
        assert.ok(x.isNotOne())
   
        x.div(10)
        assert.equal(x.isNotOne(), false)
      })
    })

    describe('isNotZero()', function () {
      it('returns true if element is not zero, false otherwise', function () {
        var x = new RealElement(10)
        assert.ok(x.isNotZero())
   
        x.mul(0)
        assert.equal(x.isNotZero(), false)
      })
    })

    describe('isOne()', function () {
      it('returns true if element is one, false otherwise', function () {
        var x = new RealElement(1)
        assert.ok(x.isOne())

        x.mul(0)
        assert.equal(x.isOne(), false)
      })
    })
   
    describe('isZero()', function () {
      it('returns true if element is zero, false otherwise', function () {
        var x = new RealElement(0)
        assert.ok(x.isZero())

        x.add(1)
        assert.equal(x.isZero(), false)
      })
    })
   
    describe('not0()', function () {
      it('is an alias of isNotZero()', function () {
        assert.ok(n.not0 === n.isNotZero) 
      })
    })

    describe('not1()', function () {
      it('is an alias of isNotOne()', function () {
        assert.ok(n.not1 === n.isNotOne) 
      })
    })

    describe('notEqual()', function () {
      it('returns true if two elements are not equal, false otherwise', function () {
        var x = new RealElement(-1)
        var y = new RealElement(-2)
   
        assert.ok(x.notEqual(y))
        assert.ok(y.notEqual(x))
   
        y.add(1)
        assert.equal(x.notEqual(y), false)
      })
   
      it('corces number type', function () {
        var x = new RealElement(-1)
        assert.ok(x.notEqual(-2))
      })
    })
   
    describe('ne()', function () {
      it('is an alias of notEqual()', function () {
        assert.ok(n.ne === n.notEqual)
      })
    })

    describe('num()', function () {
      it('is an alias of getData()', function () {
        assert.ok(n.num === n.getData) 
      })
    })
   
  /* 
    describe('neg()', function () {
      it('implements inversion by addition operator', function () {
        var x = new RealElement(4)
        var y = x.clone()
        
        y.neg()
   
        assert.ok(x.add(y).isZero())
      })
   
      it('can be chained', function () {
        var x = new RealElement(-1)
        assert.ok(x.neg().neg() instanceof RealElement)
      })
    })
   
   
    describe('subtraction()', function () {
      it('implements the subtraction operator', function () {
        var x = new RealElement(2)
        var y = new RealElement(3)
   
        x.sub(y)
   
        assert.equal(x.num(), -1)
      })
   
      it('coerces number type', function () {
        var x = new RealElement(20)
   
        x.sub(3)
   
        assert.equal(x.num(), 17)
      })
   
      it('can be chained', function () {
        var x = new RealElement(-1)
        assert.ok(x.sub(2).sub(x) instanceof RealElement)
      })
    })
   
    describe('inversion()', function () {
      it('implements inversion by multiplication operator', function () {
        var x = new RealElement(-2)
        var y = x.clone()
        
        y.inv()
   
        assert.ok(x.mul(y).isOne())
      })
   
      it('can be chained', function () {
        var x = new RealElement(4)
        assert.ok(x.inv().inv() instanceof RealElement)
      })
    })
   
    describe('multiplication()', function () {
      it('implements the multiplication operator', function () {
        var x = new RealElement(2)
        var y = new RealElement(3)
   
        x.mul(y)
   
        assert.equal(x.num(), 6)
      })
   
      it('coerces number type', function () {
        var x = new RealElement(2)
   
        x.mul(3)
   
        assert.equal(x.num(), 6)
      })
   
      it('can be chained', function () {
        var x = new RealElement(2)
        assert.ok(x.mul(2).mul(4) instanceof RealElement)
      })
    })
   
    describe('exponentiation()', function () {
      it('implements the exponential function', function () {
        var x = new RealElement(0)
   
        x.exp()
   
        assert.equal(x.num(), 1)
      })
   
      it('can be chained', function () {
        var x = new RealElement(2)
        assert.ok(x.exp() instanceof RealElement)
      })
    })
   
    describe('logarithm()', function () {
      it('implements the real logarithm', function () {
        var x = new RealElement(1)
   
        x.log()
   
        assert.equal(x.num(), 0)
      })
   
      it('can be chained', function () {
        var x1 = new RealElement(2)
        assert.ok(x1.log() instanceof RealElement)
      })
    })

*/
  })
})

