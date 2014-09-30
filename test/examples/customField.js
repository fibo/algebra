

var algebra  = require('algebra')
  , should = require('should')


var Boole = require('./Boole')

describe('Custom field example', function () {
  it('shows static operators', function () {
     Boole.contains(true).should.be.ok
     Boole.contains(10).should.not.be.ok

     Boole.addition(true, false).should.be.eql(false)
     Boole.addition(true, true).should.be.eql(true)
     Boole.addition(false, false).should.be.eql(false)
  })

})

