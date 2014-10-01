
/**
 * Abstract element
 *
 * @param {Any} data
 * @param {Function} check
 *
 */

function Element (data, check) {
  if (check(data))
      this.data = data
    else
      throw new TypeError(data)
}
  
module.exports = Element

