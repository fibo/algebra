
function MatrixRing(arg) {
  var field = arg.field;
  this.getField = function() { return field; }

  var order = arg.order;
  this.getOrder = function() { return order; }

  //this.mul;
  //this.div;
}

module.exports = MatrixRing;

