
var algebra = require('../index.js');

var GLn = algebra.Real.GeneralLinearGroup;
var Matrix = algebra.Matrix;
var RealField = algebra.Real.Field;

var GL2 = new GLn(2);
var GL3 = new GLn(3);

var matrix2 = new GL2.Matrix(0,1,-1,0);
console.log(matrix2.toString());

matrix2.tr();
console.log(matrix2.toString());

var matrix3 = new GL3.Matrix(0,1,1,1,0,-1,0,-1,0);
console.log(matrix3.toString());

/*
var R = new RealField();
var matrix2x3 = new Matrix({
  elements: [0, 1, 2, 3, 4, 5],
  field: R,
  numRows: 2,
  numCols: 3
});
console.log(matrix2x3.toString());
matrix2x3.tr();
console.log(matrix2x3.toString());
*/

