var algebra = require('algebra')

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

var Cyclic = algebra.Cyclic

var elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

var Alphanum = Cyclic(elements)

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

  describe('addition', function () {
    var operator = 'addition'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', 'b', 'c'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'a', 'b', 'c'))

    it('accepts many arguments', function () {
      var x = new Alphanum('b')
      x = x.addition('a', 'a', 'a')
      x.data.should.eql('e')
    })
  })

  describe('subtraction', function () {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(Alphanum, operator, '8', 'b', '6'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'f', 'd', 'b'))

    it('accepts many arguments', function () {
      var x = new Alphanum('e')
      x = x.subtraction('e', 'a', 'b')
      x.data.should.eql('7')
    })
  })

  describe('multiplication', function () {
    var operator = 'multiplication'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', 'b', 'b'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'c', 'c', 'i'))

    it('accepts many arguments', function () {
      var x = new Alphanum('c')
      x = x.multiplication('0', 'u', 'e')
      x.data.should.eql('5')
    })
  })

  describe('division', function () {
    var operator = 'division'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'e', 'n', 'c'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'r', 'o', 'p'))

    it('accepts many arguments', function () {
      var x = new Alphanum('y')
      x = x.division('e', 'e')
      x.data.should.eql('8')
    })
  })

  describe('equality', function () {
    var operator = 'equality'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'z', 'z', true))

    it('is a class method', function () {
      var x = new Alphanum('g')
      x.equality('g').should.be.ok
    })
  })

  describe('disequality', function () {
    var operator = 'disequality'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', ' ', true))

    it('is a class method', function () {
      var x = new Alphanum('e')
      x.disequality('n').should.be.ok
    })
  })

  describe('negation', function () {
    var operator = 'negation'

    it('is a static method', staticUnaryOperator(Alphanum, operator, 'c', '7'))

    it('is a class method', methodUnaryOperator(Alphanum, operator, 'z', 'k'))

    it('is an involution', function () {
      var x = new Alphanum('d')
      x.negation().negation().data.should.be.eql('d')
    })
  })

  describe('inversion', function () {
    var operator = 'inversion'

    it('is a static method', staticUnaryOperator(Alphanum, operator, 'w', '2'))

    it('is a class method', methodUnaryOperator(Alphanum, operator, 'y', 'q'))

    it('is an involution', function () {
      var x = new Alphanum('8')
      x.inversion().inversion().data.should.be.eql('8')
    })
  })
})
