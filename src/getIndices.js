
var toData = require('./toData')

/*!
 * Extract indices attribute, if any
 *
 * @function
 *
 * @param {Array|Any} arg
 *
 * @return {Array} indices
 */

function getIndices (arg) {
  var indices

  if (typeof arg.indices === 'undefined') {
// TODO
//   var data = toData(arg)
//
//   if (typeof data === 'array') {
//     // TODO recursion into data if it is a multidimensional array
//     indices = [data.length]
//   }
//   else {
//     indices = [1]
//   }
  }
  else {
    indices = arg.indices
  }

  if (typeof indices === 'undefined')
    throw new TypeError('No indices')

  return indices
}

module.exports = getIndices

