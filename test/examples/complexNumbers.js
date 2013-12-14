module.exports = function () {
// # Imports

var algebra = require('algebra');

var ComplexElement = algebra.ComplexElement;

// # Constructor
// A complex number is composed by a real and an imaginary part
// lets build some complex numbers
//
// z1 = 1 + 2i
// z2 = 3i
// z3 = -4
//
var z1 = new ComplexElement(1, 2);
var z2 = new ComplexElement(0, 3);
var z3 = new ComplexElement(-4);

// it is also possible to pass an array
//
//     z4 = 1 - 2i
var z4 = new ComplexElement([1, -2]);


// operators
//

// z1 + z2 = [1, 2] + [0, 3] = [1, 5]
z1.add(z2);
z1.data.should.be.eql([1, 5]);

}