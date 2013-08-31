
module.exports = function () {

  // import algebra

  var algebra = require('algebra');

  // import RealVector, a class that represents a vector over reals
  var RealVector = algebra.RealVector;

  // # Constructor
  // A real vector is an array of numbers
  //
  //     v1 = [2, 2]
  //     v2 = [1, 1, 2]
  //     v3 = [0, 1] 
  var v1 = new RealVector([2, 2]);
  var v2 = new RealVector([1, 1, 2]);
  var v3 = new RealVector([0, 1]);
};

