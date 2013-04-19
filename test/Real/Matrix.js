
var assert  = require('assert')
  , algebra = require('../../index.js')

var abstractMethod = algebra.util.abstractMethod
  , Matrix         = algebra.Matrix
  , RealMatrix     = algebra.Real.Matrix

// TODO come si chiamano m e n?
// numberOfRows numberOfColumns
// oppure anche dimensions
// TODO var matrix = new RealMatrix([2, 3], [1, 2, 3 ,4, 5 ,6])
var matrix = new RealMatrix({
  elements: [1, 2, 3,
             4, 5, 6]
})

describe('RealMatrix', function () {
  describe('Constructor', function () {
  })

  describe('Inheritance', function () {
    it('is a Matrix', function () {
      assert.ok(matrix instanceof Matrix)
    })
  })

  describe('Methods', function () {
    describe('row()', function () {
      it('is an alias of getRowByIndex()', function () {
        assert.ok(matrix.row === matrix.getRowByIndex)
      })
    })

    describe('col()', function () {
      it('is an alias of getColumnByIndex()', function () {
        assert.ok(matrix.col === matrix.getColumnByIndex)
      })
    })

  })
})

