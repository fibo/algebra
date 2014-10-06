
var algebra = require('algebra')
  , should  = require('should')

var C = algebra.Complex

describe('Complex number example', function () {
    var z1
      , z2
      , z3

  it('creates few complex numbers', function () {
    z1 = new C([1, 2]);
    z2 = new C([0, 3]);
    z3 = new C([-4, 0]);
  })

  //it('', function () {
  //})

// A complex number is composed by a real and an imaginary part
// lets build some complex numbers
//
// z1 = 1 + 2i
// z2 = 3i
// z3 = -4
//

// z1 + z2 = [1, 2] + [0, 3] = [1, 5]
//z1.add(z2);
//z1.data.should.be.eql([1, 5]);


})

