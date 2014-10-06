
var should = require('should')

var multiDimensionalArrayIndex = require('../src/multiDimensionalArrayIndex')

var dimensions
  , indices

describe('multiDimensionalArrayIndex', function () {
  it('works for 1-dim arrays', function () {
    dimensions = [3]
    indices = [1]
    multiDimensionalArrayIndex(dimensions, indices).should.eql(1)
  })

  it('works for 2-dim arrays', function () {
    dimensions = [2, 2]

    indices = [0, 0]
    multiDimensionalArrayIndex(dimensions, indices).should.eql(0)

    indices = [0, 1]
    multiDimensionalArrayIndex(dimensions, indices).should.eql(1)

    indices = [1, 0]
    multiDimensionalArrayIndex(dimensions, indices).should.eql(2)

    indices = [1, 1]
    multiDimensionalArrayIndex(dimensions, indices).should.eql(3)
  })

  it('works for 3-dim arrays', function () {
    dimensions = [2, 2, 2]
    indices = [0, 0, 0]
    multiDimensionalArrayIndex(dimensions, indices).should.eql(0)
  })
})


