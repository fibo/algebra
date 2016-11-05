describe('booleanField', () => {
  const bool = require('../src/booleanField')

  describe('contains', () => {
    it('ok for booleans, otherwise false', () => {
      bool.contains(false).should.be.ok
      bool.contains(true).should.be.ok
      bool.contains(1).should.be.ko
      bool.contains('true').should.be.ko
    })
  })

  describe('equality', () => {
    it('works', () => {
      bool.equality(false, false).should.be.ok
      bool.equality(true, true).should.be.ok
      bool.equality(true, false).should.be.ko
      bool.equality(false, true).should.be.ko
    })
  })

  describe('negation', () => {
    it('works', () => {
      bool.negation(false).should.eql(true)
      bool.negation(true).should.eql(false)
    })
  })

  describe('addition', () => {
    it('has false as neutral element', () => {
      bool.addition(true, false).should.eql(true)
      bool.addition(false, false).should.eql(false)
    })
  })

  describe('multiplication', () => {
    it('has true as neutral element', () => {
      bool.multiplication(true, true).should.eql(true)
      bool.multiplication(false, true).should.eql(false)
    })
  })
})
