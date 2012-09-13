
var C = require('./complex.js');

var complexMatrix = function () {

  this.dim = 2;
  this.alpha = C(0);
  this.beta = C(1);
  this.gamma = C(0,1);
  this.delta = C(1,0);

  this.data = [this.alpha,this.beta,this.gamma,this.delta];

}

