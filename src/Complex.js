
var iterateCayleyDickson = require('cayley-dickson'),
    realField            = require('./realField'),
    ring                 = require('./ring')

var complexField = iterateCayleyDickson(realField, 1)

  console.log(complexField)
  console.log(complexField.multiplication(complexField.one, complexField.one))
  console.log(complexField.contains(complexField.one))
var Complex = ring([complexField.zero, complexField.one], complexField)

module.exports = Complex

