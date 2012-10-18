
//Create a real number x = 10.

var algebra = require('algebra');

var Real = algebra.Real.Element;

var x = new Real(10);

//You can use the common arithmetic operators and see result.

x.mul(2);

x.add(6);

x.div(2);

x.sub(10);

console.log(x.num()); // 3

