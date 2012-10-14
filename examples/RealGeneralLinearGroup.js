
//Start with GLR2 that is the group of all 2x2 invertible real matrices.

var albegra = require('algebra');

var GLRn = algebra.Real.GeneralLinearGroup;
//var GLRn = algebra.Real.GeneralLinearGroup;

var GLR2 = new GLRn(2);

//So, here it is a 2x2 real matrix

var m1 = new GLR2.Matrix(0, -1, 1, 1);

//A funny operator is matrix transposition.

m1.transpose();

// | 0 -1 | ---\ |  0 1 |
// | 1  1 | ---/ | -1 1 |

//You can see the matrix elements, with this line of code.

console.log(m1.getElements());

