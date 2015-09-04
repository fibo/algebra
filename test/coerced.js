
var coerced = require('../src/coerced'),
    should  = require('should')

var add = coerced(function (a, b) { return a + b })

describe('coerced', function () {
  it('means to extract "data" property, if any', function () {
    add(1, 2).should.eql(3)
    add({ data: 1 }, 2).should.eql(3)
    add({ data: 1 }, 2).should.eql(3)
    add({ data: 1 }, { data: 2 }).should.eql(3)
  })
})

