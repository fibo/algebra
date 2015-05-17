
/*!
 * Converts arguments to array
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
 * @function
 *
 * @param {Object} arguments of a function
 *
 * @returns {Array} array of arguments
 */

function arrayFrom () {
  return arraySlice0.apply(null, arguments[0])
}

/*!
 */

function arraySlice0 () {
  return Array.prototype.slice.call(arguments, 0)
}

module.exports = arrayFrom

