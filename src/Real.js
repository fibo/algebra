
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    realField           = require('./realField'),
    Scalar              = require('./Scalar')

/**
 * Real number.
 *
 * ```
 * var x = new Real(1.5),
 *     y = new Real(-20);
 * ```
 *
 * @class
 *
 * @param {Number} data
 */

function Real (data) {
  Scalar.call(this, realField, data)
}

inherits(Real, Scalar)

addStaticOperators(Real, buildFieldOperators(realField))

module.exports = Real

