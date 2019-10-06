/* eslint-env mocha */

const algebra = require('algebra')

const methodBinaryOperator = require('./features/methodBinaryOperator')
const methodUnaryOperator = require('./features/methodUnaryOperator')
const staticBinaryOperator = require('./features/staticBinaryOperator')
const staticUnaryOperator = require('./features/staticUnaryOperator')

const Cyclic = algebra.Cyclic

const elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

const Alphanum = Cyclic(elements)

describe('Cyclic', () => {
  describe('zero', () => {
    it('is static', () => {
      Alphanum.zero.should.eql(' ')
    })
  })

  describe('one', () => {
    it('is static', () => {
      Alphanum.one.should.eql('a')
    })
  })

  describe('addition', () => {
    const operator = 'addition'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', 'b', 'c'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'a', 'b', 'c'))
  })

  describe('subtraction', () => {
    const operator = 'subtraction'

    it('is a static method', staticBinaryOperator(Alphanum, operator, '8', 'b', '6'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'f', 'd', 'b'))
  })

  // describe('multiplication', () => {
  //   const operator = 'multiplication'

  //   it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', 'b', 'b'))

  //   it('is a class method', methodBinaryOperator(Alphanum, operator, 'c', 'c', 'i'))
  // })

  describe('division', () => {
    const operator = 'division'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'e', 'n', 'c'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'r', 'o', 'p'))
  })

  describe('equality', () => {
    const operator = 'equality'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'z', 'z', true))

    it('is a class method', () => {
      const x = new Alphanum('g')
      x.equality('g').should.be.ok()
    })
  })

  describe('disequality', () => {
    const operator = 'disequality'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', ' ', true))

    it('is a class method', () => {
      const x = new Alphanum('e')
      x.disequality('n').should.be.ok()
    })
  })

  describe('negation', () => {
    const operator = 'negation'

    it('is a static method', staticUnaryOperator(Alphanum, operator, 'c', '7'))

    it('is a class method', methodUnaryOperator(Alphanum, operator, 'z', 'k'))

    it('is an involution', () => {
      const x = new Alphanum('d')
      x.negation().negation().data.should.be.eql('d')
    })
  })

  describe('inversion', () => {
    const operator = 'inversion'

    it('is a static method', staticUnaryOperator(Alphanum, operator, 'w', '2'))

    it('is a class method', methodUnaryOperator(Alphanum, operator, 'y', 'q'))

    it('is an involution', () => {
      const x = new Alphanum('8')
      x.inversion().inversion().data.should.be.eql('8')
    })
  })
})
