
algebra = require '../index.js'

AlgebraVector = algebra.AlgebraVector
RealField     = algebra.RealField

real = new RealField()

vector = new AlgebraVector(real, [1, 2])

describe 'AlgebraVector', ->
  describe 'constructor', ->
    it 'has signature (field, elements)' 
