
var algebra = require('algebra'),
    should  = require('should')

var R = algebra.Real

var mutatorBinaryOperator = require('./features/mutatorBinaryOperator'),
    mutatorUnaryOperator  = require('./features/mutatorUnaryOperator'),
    staticBinaryOperator  = require('./features/staticBinaryOperator'),
    staticUnaryOperator   = require('./features/staticUnaryOperator')

describe('Real', function () {
  var operator,
      x

  describe('addition', function () {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, 5))

    it('is a mutator method', mutatorBinaryOperator(R, operator, 1, 2, 3))

    it('accepts many arguments', function () {
      x = new R(1)
      x.addition(2, 3, 4)
      x.data.should.eql(10)
    })
  })

  describe('subtraction', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1))

    it('is a mutator method', mutatorBinaryOperator(R, operator, -1, -4, 3))

    it('accepts many arguments', function () {
      x = new R(10)
      x.subtraction(1, 2, 3)
      x.data.should.eql(4)
    })
  })

  describe('multiplication', function () {
    operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16))

    it('is a mutator method', mutatorBinaryOperator(R, operator, 2, 2, 4))

    it('accepts many arguments', function () {
      x = new R(2)
      x.multiplication(3, 4, 5)
      x.data.should.eql(120)
    })
  })

  describe('division', function () {
    operator = 'division'

    it('is a static method', staticBinaryOperator(R, operator, 8, 2, 4))

    it('is a mutator method', mutatorBinaryOperator(R, operator, -2, 4, -0.5))

    it('accepts many arguments', function () {
      x = new R(120)
      x.division(3, 4, 5)
      x.data.should.eql(2)
    })
  })

  describe('equality', function () {
    operator = 'equality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 10, true))

    it('is a class method', function () {
      x = new R(10)
      x.equality(10).should.be.true
    })

    it('accepts many arguments'/*, function () {
      x = new R(10)
      x.equality(5+5, 20/2).should.be.true
    }*/)
  })

  describe('disequality', function () {
    operator = 'disequality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 20, true))

    it('is a class method', function () {
      x = new R(10)
      x.disequality(20).should.be.true
    })

    it('accepts many arguments'/*, function () {
      x = new R(10)
      x.disequality(20, 30).should.be.true
    }*/)
  })

  describe('negation', function () {
    operator = 'negation'

    it('is a static method', staticUnaryOperator(R, operator, -2, 2))

    it('is a mutator method', mutatorUnaryOperator(R, operator, 8, -8))

    it('is an involution', function () {
      x = new R(10)
      x.negation().negation().data.should.be.eql(10)
    })
  })

  describe('inversion', function () {
    operator = 'inversion'

    it('is a static method', staticUnaryOperator(R, operator, 2, 0.5))

    it('is a mutator method', mutatorUnaryOperator(R, operator, -4, -0.25))

    it('is an involution', function () {
      x = new R(10)
      x.inversion().inversion().data.should.be.eql(10)
    })
  })
})

