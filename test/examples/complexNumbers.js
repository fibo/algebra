
var algebra = require('algebra');

var C = algebra.Complex;

// # Constructor
// A complex number is composed by a real and an imaginary part
// lets build some complex numbers
//
// z1 = 1 + 2i
// z2 = 3i
// z3 = -4
//
var z1 = new C([1, 2]);
var z2 = new C([0, 3]);
var z3 = new C([-4, 0]);

// z1 + z2 = [1, 2] + [0, 3] = [1, 5]
//z1.add(z2);
//z1.data.should.be.eql([1, 5]);

