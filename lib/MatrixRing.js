
function MatrixRing(arg) {
  var self = this;

  var _field = arg.field;
  this.getField = function () { return _field; }

  var _order = arg.order;
  this.getOrder = function () { return _order; }

}

module.exports = MatrixRing;

