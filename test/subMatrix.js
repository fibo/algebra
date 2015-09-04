
var should = require('should')

var subMatrix = require('../src/subMatrix')

describe('subMatrix', function () {
  it('computes the adjoint of a matrix', function () {
    var subData,
        data,
        numRows, numCols,
        row, col

    data = [1, 0,
            0, 1]
    subData = [1]
    numRows = 2
    numCols = 2
    row     = 0
    col     = 0
    subMatrix(data, numRows, numCols, row, col).should.be.eql(subData)

    data = [1, 0, 2,
            0, 0, 0,
            3, 0, 4]
    subData = [1, 2,
               3, 4]
    numRows = 3
    numCols = 3
    row     = 1
    col     = 1
    subMatrix(data, numRows, numCols, row, col).should.be.eql(subData)
  })
})

