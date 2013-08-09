
module.exports = function () {

  // import algebra

  var algebra = require('algebra');

  // import ComplexElement class: it represents a complex number
  var ComplexElement = algebra.ComplexElement;

  // a complex number is composed by a real and an imaginary part
  // lets build two complex numbers
  //
  //     z1 = 1 + 2i
  //     z2 = 3i
  //     z3 = -4
  //
  var z1 = new ComplexElement(1, 2);
  var z2 = new ComplexElement(0, 3);
  var z3 = new ComplexElement(-4);

};


