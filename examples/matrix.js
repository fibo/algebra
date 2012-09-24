
var GLn = require('../index.js').Real.GeneralLinearGroup;

var GL2 = new GLn(2);
var GL3 = new GLn(3);

var matrix2 = new GL2.Matrix(0,1,-1,0);
console.log(matrix2.toString());

matrix2.transpose();
console.log(matrix2.toString());

var matrix3 = new GL3.Matrix(0,1,1,1,0,-1,0,-1,0);
console.log(matrix3.toString());

