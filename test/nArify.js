
var nArify = require('../src/nArify'),
    should = require('should')

describe('nArify', function () {
  it('turns a 2-ary operator into an n-ary', function () {
    var add = nArify(function (a, b) { return a + b })

    add.should.be.instanceOf(Function)
    add(1, 2, 3).should.eql(6)
  })
})

