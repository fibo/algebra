
algebra = require '../index.js'

RealElement = algebra.RealElement
RealField   = algebra.RealField

R = new RealField()

describe 'RealElement', ->
  describe 'constructor', ->

    it 'data should default to 1', ->
      x = new RealElement()
      x.data.should.equal R.one

