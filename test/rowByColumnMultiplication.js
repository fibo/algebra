
var algebra = require('algebra'),
    should  = require('should')

var mul = require('../src/rowByColumnMultiplication')

var R = algebra.Real

var field,
    leftMatrix,
    leftIndices,
    rightMatrix,
    rightIndices,
    data

describe('rowByColumnMultiplication', function () {
  it('has signature (field, leftMatrix, leftIndices, rightMatrix, rightIndices)', function () {
    field = R
    leftMatrix   = [1, 0, 0, 1]
    leftIndices  = [2, 2]
    rightMatrix  = [1, 0, 0, 1]
    rightIndices = [2, 2]

    data = mul(field, leftMatrix, leftIndices, rightMatrix, rightIndices)

    data.should.eql([1, 0, 0, 1])
  })
})
