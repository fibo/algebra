
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

function valueOf () {
  return this.data
}

Element.prototype.valueOf = valueOf

module.exports = Element

