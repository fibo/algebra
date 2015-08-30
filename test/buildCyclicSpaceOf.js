
var algebra = require('algebra'),
    should  = require('should')

var buildCyclicSpaceOf = algebra.buildCyclicSpaceOf

var mutatorBinaryOperator = require('./features/mutatorBinaryOperator'),
    mutatorUnaryOperator  = require('./features/mutatorUnaryOperator'),
    staticBinaryOperator  = require('./features/staticBinaryOperator'),
    staticUnaryOperator   = require('./features/staticUnaryOperator')

var chars = 'aeiou'

var X = buildCyclicSpaceOf(chars)

describe('buildCyclicSpaceOf', function () {
  it('checks elements length is prime', function () {
    ;(function () {
      buildCyclicSpaceOf(['length', 'of', 'this', 'is', 'not', 'prime'])
    }).should.throw()
  })

  it('checks elements are unique', function () {
    ;(function () {
      buildCyclicSpaceOf([1, 2, 1])
    }).should.throw()
  })

  var operator,
      x

  describe('addition', function () {
    operator = 'addition'

    it('is a static method', function () {
      staticBinaryOperator(X, operator, 'a', 'a', 'a')
      staticBinaryOperator(X, operator, 'a', 'a', 'a')
      staticBinaryOperator(X, operator, 'a', 'e', 'e')
      staticBinaryOperator(X, operator, 'a', 'i', 'i')
      staticBinaryOperator(X, operator, 'a', 'o', 'o')
      staticBinaryOperator(X, operator, 'a', 'u', 'u')
      staticBinaryOperator(X, operator, 'e', 'e', 'i')
      staticBinaryOperator(X, operator, 'e', 'i', 'o')
      staticBinaryOperator(X, operator, 'e', 'o', 'u')
      staticBinaryOperator(X, operator, 'i', 'i', 'u')
      staticBinaryOperator(X, operator, 'i', 'o', 'a')
      staticBinaryOperator(X, operator, 'i', 'u', 'e')
      staticBinaryOperator(X, operator, 'o', 'o', 'e')
      staticBinaryOperator(X, operator, 'o', 'u', 'i')
      staticBinaryOperator(X, operator, 'u', 'u', 'o')
    })

    it('is a mutator method', function () {
      mutatorBinaryOperator(X, operator, 'a', 'a', 'a')
      mutatorBinaryOperator(X, operator, 'a', 'a', 'a')
      mutatorBinaryOperator(X, operator, 'a', 'e', 'e')
      mutatorBinaryOperator(X, operator, 'a', 'i', 'i')
      mutatorBinaryOperator(X, operator, 'a', 'o', 'o')
      mutatorBinaryOperator(X, operator, 'a', 'u', 'u')
      mutatorBinaryOperator(X, operator, 'e', 'e', 'i')
      mutatorBinaryOperator(X, operator, 'e', 'i', 'o')
      mutatorBinaryOperator(X, operator, 'e', 'o', 'u')
      mutatorBinaryOperator(X, operator, 'i', 'i', 'u')
      mutatorBinaryOperator(X, operator, 'i', 'o', 'a')
      mutatorBinaryOperator(X, operator, 'i', 'u', 'e')
      mutatorBinaryOperator(X, operator, 'o', 'o', 'e')
      mutatorBinaryOperator(X, operator, 'o', 'u', 'i')
      mutatorBinaryOperator(X, operator, 'u', 'u', 'o')
    })

    it('accepts many arguments', function () {
      X.add('a', 'e', 'i', 'o').should.eql('e')
      X.add('a', 'e', 'i', 'o', 'u').should.eql('a')

      x = new X('e')
      x.addition('i', 'o')
      x.data.should.eql('e')
    })
  })

  describe('subtraction', function () {
    operator = 'subtraction'

    it('is a static method', function () {
      staticBinaryOperator(X, operator, 'a', 'a', 'a')
      staticBinaryOperator(X, operator, 'a', 'e', 'u')
      staticBinaryOperator(X, operator, 'a', 'i', 'o')
      staticBinaryOperator(X, operator, 'a', 'o', 'i')
      staticBinaryOperator(X, operator, 'a', 'u', 'e')
      staticBinaryOperator(X, operator, 'e', 'e', 'a')
      staticBinaryOperator(X, operator, 'e', 'i', 'u')
      staticBinaryOperator(X, operator, 'e', 'o', 'o')
      staticBinaryOperator(X, operator, 'e', 'u', 'i')
      staticBinaryOperator(X, operator, 'i', 'i', 'a')
      staticBinaryOperator(X, operator, 'i', 'o', 'u')
      staticBinaryOperator(X, operator, 'i', 'u', 'o')
      staticBinaryOperator(X, operator, 'o', 'o', 'a')
      staticBinaryOperator(X, operator, 'o', 'u', 'u')
      staticBinaryOperator(X, operator, 'u', 'u', 'a')
    })

    it('is a mutator method', function () {
      mutatorBinaryOperator(X, operator, 'u', 'u', 'o')
      mutatorBinaryOperator(X, operator, 'a', 'a', 'a')
      mutatorBinaryOperator(X, operator, 'a', 'e', 'u')
      mutatorBinaryOperator(X, operator, 'a', 'i', 'o')
      mutatorBinaryOperator(X, operator, 'a', 'o', 'i')
      mutatorBinaryOperator(X, operator, 'a', 'u', 'e')
      mutatorBinaryOperator(X, operator, 'e', 'e', 'a')
      mutatorBinaryOperator(X, operator, 'e', 'i', 'u')
      mutatorBinaryOperator(X, operator, 'e', 'o', 'o')
      mutatorBinaryOperator(X, operator, 'e', 'u', 'i')
      mutatorBinaryOperator(X, operator, 'i', 'i', 'a')
      mutatorBinaryOperator(X, operator, 'i', 'o', 'u')
      mutatorBinaryOperator(X, operator, 'i', 'u', 'o')
      mutatorBinaryOperator(X, operator, 'o', 'o', 'a')
      mutatorBinaryOperator(X, operator, 'o', 'u', 'u')
      mutatorBinaryOperator(X, operator, 'u', 'u', 'a')
    })

    it('accepts many arguments', function () {
      X.sub('u', 'a', 'a').should.eql('u')

      x = new X('u')
      x.subtraction('a', 'a')
      x.data.should.eql('u')
    })
  })

  describe('negation', function () {
    operator = 'negation'

    it('is a static method', function () {
      staticUnaryOperator(X, operator, 'a', 'a')
      staticUnaryOperator(X, operator, 'e', 'u')
      staticUnaryOperator(X, operator, 'i', 'o')
      staticUnaryOperator(X, operator, 'o', 'i')
      staticUnaryOperator(X, operator, 'u', 'e')
    })

    it('is a mutator method', function () {
      mutatorUnaryOperator(X, operator, 'a', 'a')
      mutatorUnaryOperator(X, operator, 'e', 'u')
      mutatorUnaryOperator(X, operator, 'i', 'o')
      mutatorUnaryOperator(X, operator, 'o', 'i')
      mutatorUnaryOperator(X, operator, 'u', 'e')
    })
  })

  describe('multiplication', function () {
    operator = 'multiplication'
      // TODO this works, it should not X.mul('4', '3').should.eql('e')
  })

  describe('inverse', function () {
    operator = 'inverse'

      // TODO X.inv('a').should.eql(Infinity)
    it('is a static method', function () {
      staticUnaryOperator(X, operator, 'e', 'e')
      staticUnaryOperator(X, operator, 'i', 'o')
      staticUnaryOperator(X, operator, 'o', 'i')
      staticUnaryOperator(X, operator, 'u', 'u')
    })

    it('is a mutator method', function () {
      mutatorUnaryOperator(X, operator, 'e', 'e')
      mutatorUnaryOperator(X, operator, 'i', 'o')
      mutatorUnaryOperator(X, operator, 'o', 'i')
      mutatorUnaryOperator(X, operator, 'u', 'u')
    })
  })

  describe('division', function () {
    operator = 'division'

    it('is a static method', function () {
      staticBinaryOperator(X, operator, 'e', 'e', 'e')
      staticBinaryOperator(X, operator, 'i', 'i', 'e')
      staticBinaryOperator(X, operator, 'o', 'o', 'e')
      staticBinaryOperator(X, operator, 'u', 'u', 'e')
// TODO more results
    })

    it('is a mutator method', function () {
      mutatorBinaryOperator(X, operator, 'e', 'e', 'e')
      mutatorBinaryOperator(X, operator, 'i', 'i', 'e')
      mutatorBinaryOperator(X, operator, 'o', 'o', 'e')
      mutatorBinaryOperator(X, operator, 'u', 'u', 'e')
    })

  })

  describe('contains', function () {
    it('results', function () {
      X.contains('a').should.be.ok
      X.contains('e').should.be.ok
      X.contains('i').should.be.ok
      X.contains('o').should.be.ok
      X.contains('u').should.be.ok

      X.contains('0').should.not.be.ok
      X.contains('1').should.not.be.ok
      X.contains('2').should.not.be.ok
      X.contains('*').should.not.be.ok
    })
  })
})

