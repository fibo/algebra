
var RealField = require('../index.js').Real.Field;

var R = new RealField();

var zero = R.getZero();
console.log(zero);

var one = R.getOne();
console.log(one);

var a = -1, b = 4, c;

c = R.addition(a, b);
console.log(c);

c = R.subtraction(a, b);
console.log(c);

c = R.multiplication(a, b);
console.log(c);

c = R.division(a, b);
console.log(c);

