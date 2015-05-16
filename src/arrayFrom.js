
/*!
 * Convert arguments to array
 *
 * ```
 * function () {
 *   console.log(typeof arguments) // object
 *
 *   var args = arrayFrom(arguments)
 *
 *   console.log(typeof args) // array
 * }
 * ```
 *
 * @param {Object} arguments of a function
 *
 * @return {Array} array of arguments
 */

function arrayFrom () {
  return (function arraySlice0 () {
    return Array.prototype.slice.call(arguments, 0)
  }).apply(null, arguments[0])
}

module.exports = arrayFrom

