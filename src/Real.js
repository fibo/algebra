
var realField = require('./realField'),
    ring      = require('./ring')

var Real = ring([realField.zero, realField.one], realField)

module.exports = Real

