
//
// # Imports
//

var algebra = require('algebra');

var RealElement = algebra.RealElement;

//
// # Constructor
//
// A real number is just a common number
//
//x1 = 4
//x2 = -1
//x3 = 0.7
//x4 = 2
//

var x1 = new RealElement(4);
var x2 = new RealElement(-1);
var x3 = new RealElement(0.7);
var x4 = new RealElement(2);

// arithmetic operators are implemented
//

// x1 + x2 = 4 + (-1) = 3
x1.add(x2);
x1.data.should.be.eql(3);

// x1 - x2 = 3 - (-1) = 4
x1.sub(x2);
x1.data.should.be.eql(4);

// x3 * 10 = 0.7 * 10 = 7
x3.mul(10);
x3.data.should.be.eql(7);

// x4 / 4  = 2 / 4 = 0.5
x4.div(4);
x4.data.should.be.eql(0.5);

// operators can be chained
// ((( x1 + 2 ) * 3 ) - 6) / 4 =
// ((( 4 + 2 ) * 3 ) - 6) / 4 =
// ((6 * 3) - 6) / 4 =
// (18 - 6) / 4 =
// 12 / 4 = 3

x1.add(2).mul(3).sub(6).div(4);
//x1.data.should.be(3);

