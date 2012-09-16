
var Matrix = function() {

  var GL4R = arguments.GL4R;

  // TODO forse è ancora meglio se Matrix e' generico e faccio SquareMatrix

  this.ij = function(i, j) { return data[i][j]; }

  this.getData = function() { return data; }

  this.getDim = GL4R.getDim;

  this.transpose = function () {
    for ( var i = 0; i < dim; i++) {
      for ( var j = 0; j < dim; j++) {
        if ( i == j ) next;
        var swap = data[i][j];
        data[i][j] = data[j][i];
        data[j][i] = swap;
      }
    }
  }

  this.add = function(B) { return GLnR.add(this,B); }
  this.mul = function(B) { return GLnR.mul(this,B); }
  this.sub = function(B) { return GLnR.sub(this,B); }
  this.div = function(B) { return GLnR.div(this,B); }

}

module.exports = Matrix;

