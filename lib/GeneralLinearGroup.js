
var GeneralLinearGroup = function() {

  var dim = 4;
  this.getDim = function() { return dim; }

}

GeneralLinearGroup.prototype = {
  add: function(A, B) {},
  mul: function(A, B) {},
  sub: function(A, B) {},
  div: function(A, B) {},
  eq: function(A, B) {
    // TODO vedi se riesci a fare il confronto a meno
    //      del fattore scalare.
    return false;
  },
  Identity: function() {

    var data = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    return new Matrix({
      GL4R:this,
      data:data
    });
  },
};

module.exports = GeneralLinearGroup;

