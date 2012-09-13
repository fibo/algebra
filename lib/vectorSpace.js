
var VectorSpace = function() {

  if (arguments.length == 1) {
    this.dim = arguments[0];
  }
  else {
    // Set default dimension = 4.
    // The fourth dimension is the most wonderful,
    // much more than 5, 6, 7 ... dimension.
    this.dim = 4;
  }

}
