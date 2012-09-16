
var Vector = function () {

  var space = arguments.space;

  this.getSpace = function() { return space; }

  var elements = [];

  this.x = function (i) { return elements[i]; }

}

Vector.prototype = {

  getDim: function() {
    return this.getSpace().getDim();
  }

};

module.exports = Vector;

