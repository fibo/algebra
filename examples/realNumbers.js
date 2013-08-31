
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
};

