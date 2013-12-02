
module.exports = function () {

  // import algebra

  var algebra = require('algebra');

  // import RealVector, a class that represents a vector over reals
  var RealVector = algebra.RealVector;

  var RealElement = algebra.RealElement;

  // # Constructor
  // A real vector is an array of numbers. You can pass to the constructor
  // a reference to an array of elements, or an element in every argument.
  //
  // Create two dimensional vectors v1 and v2.
  //     v1 = [2, 2]
  //     v2 = [1, 1]
  var one = new RealElement(1);
  //var two = new RealElement(2);
  //var v1 = new RealVector([two, two]);
  var v2 = new RealVector(one, one);
  var v1 = new RealVector([2, 2]);
  //var v2 = new RealVector(1, 1);

  // Numbers are coerced to RealElement.
  //
  // Create three dimensional vectors v3 and v4.
  //     v3 = [0, 1, 2]
  //     v4 = [-1, -1, -1]

  var v3 = new RealVector([0, 1, 2]);
  var v4 = new RealVector(-1, -1, -1);

  // # Attributes

  // ## dimension
  // strictly speaking returns the number of elements of the vector.
  v1.dimension.should.eql(2);
  v4.dimension.should.eql(3);

  // ## elements
  // returns the elements of the vector, that are instances of RealElement class.
  v4.elements[0].should.be.instanceOf(RealElement);
  for (var i in v4.elements) {
    var element = v4.elements[i];
    element.data.should.be.eql(-1);
  }

  // ## data
  // returns vector elements data
  v2.data.should.be.eql([1, 1]);

  // # Methods

  // ## addition
  //     [2, 2] + [1, 1] = [3, 3]
  v1.addition(v2);
  v1.data.should.eql([3, 3]);

  // ## subtraction

  //     [0, 1, 2] - [-1, -1, -1] = [1, 2, 3]
  v3.subtraction(v4);
  v3.data.should.eql([1, 2, 3]);
};

