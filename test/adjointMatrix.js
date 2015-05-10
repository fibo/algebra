
var should = require('should')

var adjointMatrix = require('../src/adjointMatrix')

describe('adjointMatrix', function () {
  it('computes the adjoint of a matrix', function () {
    var data,
        adjoint

    data = [1, 0,
            0, 1]
    adjoint = [1]
    adjointMatrix(data, 2, 2, 0, 0).should.be.eql(adjoint)

    data = [1, 0, 0,
            0, 1, 0,
            1, 0, 1]
    adjoint = [1, 0,
               1, 1]
    adjointMatrix(data, 3, 3, 1, 1).should.be.eql(adjoint)
  })
})

