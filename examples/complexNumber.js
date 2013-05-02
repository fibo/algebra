
var algebra = require('algebra');

var Complex = algebra.Complex.Element;

// Create a complex number z = 1 + 2i.

var z = new Complex(1, 2);

// As a complex number, z has a real and an imaginary part.

console.log(z.re()); // 1
console.log(z.im()); // 2

// You can conjugate z.

z.conj();

console.log(z.re()); // 1
console.log(z.im()); // -2

