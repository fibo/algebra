
var algebra = require('..'),
    should  = require('should')

var buildCyclicSpaceOf = algebra.buildCyclicSpaceOf

var chars = ' 1234567890abcdefghijklmnopqrstuvwxyz'

var X = buildCyclicSpaceOf(chars)

describe('buildCyclicSpaceOf', function () {
  it('checks elements length is prime')

  describe('static', function () {
    it('addition', function () {
      X.add('a', '1').should.eql('b')
    })

/*
    it('', function () {

    })
*/
  })  
})

