
var algebra = require('algebra'),
    should  = require('should')

var mul = require('../src/rowByColumnMultiplication')

var real = {
  addition      : function (a, b) { return a + b },
  multiplication: function (a, b) { return a * b }
}

var scalar,
    leftMatrix,
    leftIndices,
    rightMatrix,
    rightIndices,
    data

describe('rowByColumnMultiplication', function () {
  it('implements row by column multiplication', function () {
    scalar       = real
    leftMatrix   = [1, 0,
                    0, 1]
    rightMatrix  = [1, 0,
                    0, 1]

    data = mul(scalar, leftMatrix, 2, rightMatrix, 2)

    data.should.eql([1, 0,
                     0, 1])

    leftMatrix = [ 2, 3,
                   1, 1,
                   1, 1 ],
    rightMatrix = [ 0, 1, 1, 1,
                   -1, 0, 2, 3 ]

    data = mul(scalar, leftMatrix, 3, rightMatrix, 4)

    data.should.eql([ -3, 2, 8, 11,
                      -1, 1, 3, 4,
                      -1, 1, 3, 4 ])

    leftMatrix = [ 2, 3,
                   1, 1 ]
    rightMatrix = [ 0, 1,
                   -1, 0 ]

    data = mul(scalar, leftMatrix, 2, rightMatrix, 2)

    data.should.eql([ -3, 2,
                      -1, 1 ])
  })
})
