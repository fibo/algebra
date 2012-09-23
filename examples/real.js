
var RealField = require('../index.js').Real.Field;

var R = new RealField();

var zero = R.getZero();
console.log(zero);

var one = R.getOne();
console.log(one);

var a = -1, b = 4, c;

c = R.add(a, b);
console.log(c);

c = R.sub(a, b);
console.log(c);

c = R.mul(a, b);
console.log(c);

c = R.div(a, b);
console.log(c);

