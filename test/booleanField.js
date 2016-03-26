var booleanField = require('../src/booleanField')

describe('booleanField', () => {
  describe('negation', () => {
    it('works', () => {
      booleanField.negation(false).should.eql(true)
      booleanField.negation(true).should.eql(false)
    })
  })
  describe('addition', () => {
    it('has false as neutral element', () => {
      booleanField.addition(true, false).should.eql(true)
      booleanField.addition(false, false).should.eql(false)
    })
  })

  describe('subtraction', () => {
    it('has false as neutral element', () => {
      booleanField.subtraction(true, false).should.eql(true)
      booleanField.subtraction(false, false).should.eql(false)
    })
  })
})
