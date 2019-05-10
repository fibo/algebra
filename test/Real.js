const algebra = require('algebra')
const realField = require('../src/realField');
const assert = require('assert');

const R = algebra.Real

const methodBinaryOperator = require('./features/methodBinaryOperator')
const methodUnaryOperator = require('./features/methodUnaryOperator')
const staticBinaryOperator = require('./features/staticBinaryOperator')
const staticUnaryOperator = require('./features/staticUnaryOperator')

describe('Real', () => {
  describe('zero', () => {
    it('is static', () => {
      R.zero.should.eql(0)
    })
  })

  describe('one', () => {
    it('is static', () => {
      R.one.should.eql(1)
    })
  })

  describe('addition', () => {
    const operator = 'addition'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, 5))

    it('is a class method', methodBinaryOperator(R, operator, 1, 2, 3))

    it('accepts many arguments', () => {
      const x = new R(1)
      x.addition(2, 3, 4).data.should.eql(10)
    })
  })

  describe('subtraction', () => {
    const operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1))

    it('is a class method', methodBinaryOperator(R, operator, -1, -4, 3))

    it('accepts many arguments', () => {
      const x = new R(10)
      x.subtraction(1, 2, 3).data.should.eql(4)
    })
  })

  describe('multiplication', () => {
    const operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16))

    it('is a class method', methodBinaryOperator(R, operator, 2, 2, 4))

    it('accepts many arguments', () => {
      const x = new R(2)
      x.multiplication(3, 4, 5).data.should.eql(120)
    })
  })

  describe('division', () => {
    const operator = 'division'

    it('is a static method', staticBinaryOperator(R, operator, 8, 2, 4))

    it('is a class method', methodBinaryOperator(R, operator, -2, 4, -0.5))

    it('accepts many arguments', () => {
      const x = new R(120)
      x.division(3, 4, 5).data.should.eql(2)
    })
  })

  describe('equality', () => {
    const operator = 'equality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 10, true))

    it('is a class method', () => {
      const x = new R(10)
      x.equality(10).should.be.ok()
    })
  })

  describe('disequality', () => {
    const operator = 'disequality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 20, true))

    it('is a class method', () => {
      const x = new R(10)
      x.disequality(20).should.be.ok()
    })
  })

  describe('negation', () => {
    const operator = 'negation'

    it('is a static method', staticUnaryOperator(R, operator, -2, 2))

    it('is a class method', methodUnaryOperator(R, operator, 8, -8))

    it('is an involution', () => {
      const x = new R(10)
      x.negation().negation().data.should.be.eql(10)
    })
  })

  describe('inversion', () => {
    const operator = 'inversion'

    it('is a static method', staticUnaryOperator(R, operator, 2, 0.5))

    it('is a class method', methodUnaryOperator(R, operator, -4, -0.25))

    it('is an involution', () => {
      const x = new R(10)
      x.inversion().inversion().data.should.be.eql(10)
    })
  })

  describe('realField', () => {
    it('epsilon', () => {
      assert(realField.equality(0.2 + 0.1, 0.3));
    })
  });
})
