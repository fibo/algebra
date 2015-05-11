
/**
 * Compute index of multi dim array
 *
 * Given
 *
 * dimensions d_1, d_2, d_3 .. d_n
 * and
 * indices i_1, i_2, i_3 .. i_n
 *
 * index is computed by formula
 * index = i_n + i_(n-1) * d_n + i_(n-2) * d_n * d_(n-1) + ... + i_2 * d_n * d_(n-1) * ... * d_3 + i_1 * d_n * ... * d_2
 *
 * @param {Array} dimensions
 * @param {Array} indices
 *
 * @returns {Number} index
 */

function multiDimensionalArrayIndex(dimensions, indices) {
  var l = dimensions.length - 1
    , index = indices[l]
    , factor

  if (dimensions.length > 1) {
    factor = dimensions[l - 1]

    index += factor * indices[l - 1]
  }

  for (var i = 2; i < dimensions.length; i++) {
    factor *= dimensions[l - i + 1]

    index += factor * indices[l - i]
  }

  return index
}

module.exports = multiDimensionalArrayIndex

