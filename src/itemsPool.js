
function itemsPool () {
  var MatrixSpace,
      VectorSpace

  function getMatrixSpace () {
    if (typeof MatrixSpace === 'undefined')
      throw new Error('MatrixSpace not yet in items pool')

    return MatrixSpace
  }

  this.getMatrixSpace = getMatrixSpace

  function setMatrixSpace (item) {
    if (typeof MatrixSpace === 'undefined')
      MatrixSpace = item
    else throw new Error('MatrixSpace already in items pool')
  }

  this.setMatrixSpace = setMatrixSpace

  function getVectorSpace () {
    if (typeof VectorSpace === 'undefined')
      throw new Error('VectorSpace not yet in items pool')

    return VectorSpace
  }

  this.getVectorSpace = getVectorSpace

  function setVectorSpace (item) {
    if (typeof VectorSpace === 'undefined')
      VectorSpace = item
    else throw new Error('VectorSpace already in items pool')
  }

  this.setVectorSpace = setVectorSpace
}

module.exports = new itemsPool()

