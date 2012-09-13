
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
  if (arguments.length == 1) {
    this.dim = arguments[0];
  }
  else {
    // Set default dimension = 4.
    // The fourth dimension is the most wonderful,
    // much more than 5, 6, 7 ... dimension.
    this.dim = 4;
  }

  this.transpose = function () {
    for( var i = 0; i < this.dim; i++) {
      for( var j = 0; j < this.dim; j++) {
        if ( i == j ) next;
        var swap = this.data[i][j];
        this.data[i][j] = this.data[j][i];
        this.data[j][i] = swap;
      }
    }
  }

  //console.log(arguments[0]);

}

exports.Matrix = Matrix;

