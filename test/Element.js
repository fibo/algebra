
require('strict-mode')(function () {

var Element = require('../src/Element'),
    should  = require('should')

describe('Element', function () {
  it('has signature (data, check)', function () {
    var check = isFinite,
        data  = 1

    var e = new Element(data, check)
  })

  it('throws if no data is given', function () {
    ;(function () {
        var e = new Element()
      }).should.throwError(/Undefined data/)
  })
})

})

