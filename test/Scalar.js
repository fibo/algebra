var Scalar = require('algebra').Scalar
var realField = require('../src/realField')

var R = Scalar(realField)

describe('Scalar', () => {
  it('checks n is 1, 2, 4 or 8', () => {
    ;(() => {
      Scalar(realField, 3)
    }).should.throw()
  })

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
