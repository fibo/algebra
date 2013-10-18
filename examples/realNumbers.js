
module.exports = function () {

  // import algebra

  var algebra = require('algebra');

  // import RealElement, a class that represents a real number
  var RealElement = algebra.RealElement;

  // # Constructor
  // A real number is just a common number
  //
  //     x1 = 4
  //     x2 = -1
  //     x3 = 0.7 
  var x1 = new RealElement(4);
  var x2 = new RealElement(-1);
  var x3 = new RealElement(0.7);

  // operators
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



};

