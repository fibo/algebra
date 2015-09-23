
/**
 * Abstract element
 *
 * It has a *data* attribute that can contain anything, validated by its *check*.
 *
 * @param {*} data
 * @param {Function} check
 */

class Element {
  constructor (data, check) {
    if (typeof data === 'undefined')
      throw new TypeError('Undefined data')

  if (check(data))
    this.data = data
  else
    throw new TypeError('Invalid data = ' + data)
}

  valueOf () {
    return this.data
  }
}

module.exports = Element

