
/**
  * Extract data attribute, if any, and check it
  *
  * @param {Object|Any} arg
  *
  * @return {Any} data
  */

function toData (arg) {
  var data

  if (typeof arg.data === 'undefined')
    data = arg
  else
    data = arg.data

  if (typeof data === 'undefined')
    throw new TypeError('No data')

  return data
}

module.exports = toData

