var algebra = require('algebra')

var R = algebra.Real

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

describe('Real', function () {
  describe('zero', function () {
    it('is static', function () {
      R.zero.should.eql(0)
    })
  })

  describe('one', function () {
    it('is static', function () {
      R.one.should.eql(1)
    })
  })

  describe('addition', function () {
    var operator = 'addition'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, 5))

    it('is a class method', methodBinaryOperator(R, operator, 1, 2, 3))

    it('accepts many arguments', function () {
      var x = new R(1)
      x = x.addition(2, 3, 4)
      x.data.should.eql(10)
    })
  })

  describe('subtraction', function () {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1))

    it('is a class method', methodBinaryOperator(R, operator, -1, -4, 3))

    it('accepts many arguments', function () {
      var x = new R(10)
      x = x.subtraction(1, 2, 3)
      x.data.should.eql(4)
    })
  })

  describe('multiplication', function () {
    var operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16))

    it('is a class method', methodBinaryOperator(R, operator, 2, 2, 4))

    it('accepts many arguments', function () {
      var x = new R(2)
      x = x.multiplication(3, 4, 5)
      x.data.should.eql(120)
    })
  })

  describe('division', function () {
    var operator = 'division'

    it('is a static method', staticBinaryOperator(R, operator, 8, 2, 4))

    it('is a class method', methodBinaryOperator(R, operator, -2, 4, -0.5))

    it('accepts many arguments', function () {
      var x = new R(120)
      x = x.division(3, 4, 5)
      x.data.should.eql(2)
    })
  })

  describe('equality', function () {
    var operator = 'equality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 10, true))

    it('is a class method', function () {
      var x = new R(10)
      x.equality(10).should.be.ok
    })
  })

  describe('disequality', function () {
    var operator = 'disequality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 20, true))

    it('is a class method', function () {
      var x = new R(10)
      x.disequality(20).should.be.ok
    })
  })

  describe('negation', function () {
    var operator = 'negation'

    it('is a static method', staticUnaryOperator(R, operator, -2, 2))

    it('is a class method', methodUnaryOperator(R, operator, 8, -8))

    it('is an involution', function () {
      var x = new R(10)
      x.negation().negation().data.should.be.eql(10)
    })
  })

  describe('inversion', function () {
    var operator = 'inversion'

    it('is a static method', staticUnaryOperator(R, operator, 2, 0.5))

    it('is a class method', methodUnaryOperator(R, operator, -4, -0.25))

    it('is an involution', function () {
      var x = new R(10)
      x.inversion().inversion().data.should.be.eql(10)
    })
  })
})
