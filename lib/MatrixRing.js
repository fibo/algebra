
var MatrixRing = function(arg) {
  var field = arg.field;
  this.getField = function() {
    return field;
  }

  var order = arg.order;
  this.getOrder = function() {
    return order;
  }
}


MatrixRing.prototype = {
  addition: function(a, b){},
  multiplication: function(a, b){},
  subratction: function(a, b){},
  division: function(a, b){},
};

module.exports = MatrixRing;

