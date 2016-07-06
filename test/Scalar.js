var CompositionAlgebra = require('algebra').CompositionAlgebra
var realField = require('../src/realField')

var R = CompositionAlgebra(realField)

describe('CompositionAlgebra', () => {
  describe('data', () => {
    var pi = new R(Math.PI)

    it('is enumerable', () => {
      pi.propertyIsEnumerable('data').should.be.ok
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        pi.data = 2
      }).should.throwError()
    })
  })
})
