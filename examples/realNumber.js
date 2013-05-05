
// Create a real number x = 10.

var algebra = require('algebra');

var Real = algebra.Real.Element;

var x = new Real(10);

//You can use the common arithmetic operators and see result.

x.mul(2); // x -> x * 2

x.add(6); // x -> x + 6 

x.div(2); // x -> x / 2

x.sub(5); // x -> x - 5

console.log(x.num()); // 8

// You can use chaining but remember that operator precedence may not be what you expect.

var x1 = new Real(5);
var x2 = new Real(6);
var x3 = new Real(2);

x1.add(x2).mul(x3); // x1 -> (x1 + x2) * x3

x1.add(x2.mul(x3)); // x1 -> x1 + (x2 * x3)

// You can invert by addition and multiplication operators.

var ten = new Real(10);

ten.neg();

console.log(ten.num()); // -10

ten.inv();

console.log(ten.num()); // -0.1

// Also inversions can be chained.

ten.inv().neg();

console.log(ten.num()); // 10 ( again :)

// Operations can modify a real number. You can clone it if you want to preserve it.

var one = new Real(1);

var y = one.clone();

// 1 -> 10 -> 2 -> 1 -> -1 -> 1 -> 1
y.mul(10).sub(8).div(2).neg().add(2).inv();

// You can check if two numbers are equal.

if (one.eq(y)) {
  console.log('y = 1');
}

