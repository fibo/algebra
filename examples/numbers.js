
var Real       = require('../index.js').Real.Element;
var Complex    = require('../index.js').Complex.Element;
var Quaternion = require('../index.js').Quaternion.Element;
//var Octonion   = require('../index.js').Octonion.Element;

var r = new Real(2);
var z = new Complex(-1,1);
var q = new Quaterion(1,1,1,1);
//var o = new Octonion(0);

r.add(z);
console.log(r);

z.mul(q);
console.log(z);

r.add(z).mul(q);
//r.add(z).mul(q).sub(o);
console.log(r);

