

var Quaternion = require('../index.js').Quaternion.Element;
var QuaterionRing = require('../index.js').Quaternion.Ring;

var H = new QuaterionRing();

var zero = H.getZero();
console.log(zero.toString());

var q = new Quaternion(1);
console.log(q.im());

