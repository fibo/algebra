
var iterateCayleyDickson = require('cayley-dickson'),
    realField            = require('./realField'),
    ring                 = require('./ring')

var quaternionField = iterateCayleyDickson(realField, 2)

var Quaternion = ring([quaternionField.zero, quaternionField.one], quaternionField)

module.exports = Quaternion

