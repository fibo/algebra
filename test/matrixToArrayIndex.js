
var matrixToArrayIndex = require('../src/matrixToArrayIndex')

var data
var numCols

describe('matrixToArrayIndex', function () {
  it('converts 2dim array index into 1dim index', function () {
    data = ['a', 'b',
            'c', 'd']
    numCols = 2

    data[matrixToArrayIndex(0, 0, numCols)].should.eql('a')
    data[matrixToArrayIndex(0, 1, numCols)].should.eql('b')
    data[matrixToArrayIndex(1, 0, numCols)].should.eql('c')
    data[matrixToArrayIndex(1, 1, numCols)].should.eql('d')

    data = [0, 1, 2,
            3, 4, 5]
    numCols = 3

    data[matrixToArrayIndex(0, 0, numCols)].should.eql(0)
    data[matrixToArrayIndex(0, 1, numCols)].should.eql(1)
    data[matrixToArrayIndex(0, 2, numCols)].should.eql(2)
    data[matrixToArrayIndex(1, 0, numCols)].should.eql(3)
    data[matrixToArrayIndex(1, 1, numCols)].should.eql(4)
    data[matrixToArrayIndex(1, 2, numCols)].should.eql(5)

    data = [0, 1,
            2, 3,
            4, 5]
    numCols = 2

    data[matrixToArrayIndex(0, 0, numCols)].should.eql(0)
    data[matrixToArrayIndex(0, 1, numCols)].should.eql(1)
    data[matrixToArrayIndex(1, 0, numCols)].should.eql(2)
    data[matrixToArrayIndex(1, 1, numCols)].should.eql(3)
    data[matrixToArrayIndex(2, 0, numCols)].should.eql(4)
    data[matrixToArrayIndex(2, 1, numCols)].should.eql(5)
  })
})

