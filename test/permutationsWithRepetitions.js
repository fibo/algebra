var permutationsWithRepetitions = require('../src/permutationsWithRepetitions')

describe('permutationsWithRepetitions', () => {
  it('reduce [n] to [[0], [1], ..., [n-1]]', () => {
    [5].reduce(permutationsWithRepetitions, [])
       .should.be.eql([[0], [1], [2], [3], [4]])
  })

  it('reduce [m, n] to [[0, 0], [0, 1], ... ,[m-1, n-1]]', () => {
    [3, 3].reduce(permutationsWithRepetitions, [])
          .should.be.eql([[0, 0], [0, 1], [0, 2],
                          [1, 0], [1, 1], [1, 2],
                          [2, 0], [2, 1], [2, 2]])
  })
})
