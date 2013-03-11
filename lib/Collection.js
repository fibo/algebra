
var Element = require('./Element.js');

var InvalidArgumentsException = require('./Exception/InvalidArguments.js');

function Collection() {
  var self = this;

  // TODO provvisorio, dovrei implementare un check per ogni elemento aggiunto
  //      dovrei controllare che sia istanceof l' elemento massimale
  //      ad esempio se ho tutti reali e aggiungo un complesso, diventa una collection di numeri complessi
  //      ... vabbè, per ora è solo un' idea, cmq si può implementare.
  var _elements = arguments[0];

  var _dimension = 1;
  var _orders = [0];

  function getElements() { return _elements; };

  function getElementByIndices(indices) {

  };
};

module.exports = Collection;

