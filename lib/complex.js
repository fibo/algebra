
var Complex = function(alpha, beta) {

  this.alpha = alpha;
  this.beta = beta;

  this.conjugate = function() {
    this.beta = 0 - this.beta;
    return this;
  }

  this.modulo = function() {
    this.alpha * this.alpha
  }
}
