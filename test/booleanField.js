describe('booleanField', () => {
  // Don't know why *should* has strange behaviour here.
  var assert = require('assert')
  var bool = require('../src/booleanField')

  describe('contains', () => {
    it('ok for booleans, otherwise false', () => {
      assert.ok(bool.contains(false))
      assert.ok(bool.contains(true))
      assert.ok(!bool.contains(1))
      assert.ok(!bool.contains('true'))
    })
  })

  describe('negation', () => {
    it('works', () => {
      assert.equal(bool.negation(false), true)
      assert.equal(bool.negation(true), false)
    })
  })

  describe('addition', () => {
    it('has false as neutral element', () => {
      assert.equal(bool.addition(true, false), true)
      assert.equal(bool.addition(false, false), false)
    })
  })
})
