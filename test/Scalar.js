/* eslint-env mocha */
const CompositionAlgebra = require('algebra').CompositionAlgebra
const realField = require('../src/realField')

const R = CompositionAlgebra(realField)

describe('CompositionAlgebra', () => {
  describe('data', () => {
    const pi = new R(Math.PI)

    it('is enumerable', () => {
      Object.prototype.propertyIsEnumerable.call(pi, 'data').should.be.ok()
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        pi.data = 2
      }).should.throwError()
    })
  })
})
