
var Complex = require('../index.js').Complex.Element;
var ComplexField = require('../index.js').Complex.Field;

var C = new ComplexField();

var zero = new Complex();
console.log(zero);

var one = C.getOne();
console.log(one);

var a = new Complex(-1, 2);
var b = new Complex(4, 1);
var c;

c = C.addition(a, b);
console.log(c);

c = C.subtraction(a, b);
console.log(c);

c = C.multiplication(a, b);
console.log(c);

c = C.division(a, b);
console.log(c);

