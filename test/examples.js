
var test = require('../examples')

for (var example in test)
  describe(example, function () {
    it('example works', test[example])
  })

