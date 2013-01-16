
function RealSquareMatrix(arg) {
  var self = this;

  var _elements = arg.elements;
  self.getElements = function () { return _elements };
};

module.exports = RealSquareMatrix;

