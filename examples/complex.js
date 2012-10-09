
var algebra = require('../index.js');

var Complex = algebra.Complex.Element;
var ComplexField = algebra.Complex.Field;

var C = new ComplexField();

var zero = C.getZero();
console.log(zero.toString());

var one = C.getOne();
console.log(one.toString());

var a = new Complex(-1, 2);
var b = new Complex(4, 1);
var c;

c = C.add(a, b);
console.log(c.toString());

c = C.sub(a, b);
console.log(c.toString());

c = C.mul(a, b);
console.log(c.toString());

c = C.div(a, b);
console.log(c.toString());

c = C.neg(a, b);
console.log(c.toString());

c.conj().add(one).inv();
console.log(c.toString());

