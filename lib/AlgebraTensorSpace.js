
// AlgebraTensorSpace

function AlgebraTensorSpace(field, indices) {
  // field
  function getField() { return field }

  Object.defineProperty(this, 'field', {get: getField})

  // indices
  function getIndices() { return indices }

  Object.defineProperty(this, 'indices', {get: getIndices})
}

module.exports = AlgebraTensorSpace

