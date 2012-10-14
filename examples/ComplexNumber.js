
//Create a complex number z = 1 + 2i.

var algebra = require('algebra');

var Complex = algebra.Complex.Element;

var z = new Complex(1, 2);

//As a complex number, z has a real and an imaginary part.

    console.log(z.re());
    console.log(z.im());

//You can conjugate z.

z.conj();


