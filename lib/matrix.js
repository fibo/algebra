
var Matrix = function() {

  this.data = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];

  this.ij = function(i, j) {
    var cell = this.data[i][j];
    return cell;
  }
  if(arguments.length == 1){
    this.dim = arguments[0];
  }
  else {
    // Set default dimension = 4.
    // The fourth dimension is the most wonderful,
    // much more than 5, 6, 7 ... dimension.
    this.dim = 4;
  }

  //console.log(arguments[0]);

}

exports.Matrix = Matrix;

