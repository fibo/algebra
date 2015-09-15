
var algebra = require('algebra'),
    should  = require('should')

var C = algebra.Complex

var mutatorBinaryOperator = require('./features/mutatorBinaryOperator'),
    mutatorUnaryOperator  = require('./features/mutatorUnaryOperator'),
    staticBinaryOperator  = require('./features/staticBinaryOperator'),
    staticUnaryOperator   = require('./features/staticUnaryOperator')

describe('Complex', function () {
  var operator

  describe('zero', function () {
    it('is static', function () {
      C.zero.data.should.eql([0, 0])
    })
  })

  describe('one', function () {
    it('is static', function () {
      C.one.data.should.eql([1, 0])
    })
  })

  describe('addition', function () {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, 3], [4, 4]))

    it('is a mutator method', mutatorBinaryOperator(C, operator, [1, 2], [1, -1], [2, 1]))
  })

/*
  describe('subtraction', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, 3], [0, -2]))

    it('is a mutator method', mutatorBinaryOperator(C, operator, [0, 2], [1, -2], [-1, 4]))
  })

  describe('multiplication', function () {
    operator = 'multiplication'

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, -1], [5, 0]))

    it('is a mutator method', mutatorBinaryOperator(C, operator, [1, 2], [-1, 2], [-5, 0]))
  })

  describe('division', function () {
    operator = 'division'

    it('is a static method', staticBinaryOperator(C, operator, [2, 4], [2, 0], [1, 2]))

    it('is a mutator method', mutatorBinaryOperator(C, operator, [5, 0], [2, -1], [2, 1]))
  })

  describe('negation', function () {
    operator = 'negation'

    it('is a static method', staticUnaryOperator(C, operator, [-2, 1], [2, -1]))

    it('is a mutator method', mutatorUnaryOperator(C, operator, [1, 8], [-1, -8]))
  })

  describe('conjugation', function () {
    operator = 'conjugation'

    it('is a static method', staticUnaryOperator(C, operator, [2, 1], [2, -1]))

    it('is a mutator method', mutatorUnaryOperator(C, operator, [1, 7], [1, -7]))
  })
*/
})

