
var Element = require('./Element.js');

function Collection() {
  var self = this;

  // TODO provvisorio, dovrei implementare un check per ogni elemento aggiunto
  //      dovrei controllare che sia istanceof l' elemento massimale
  //      ad esempio se ho tutti reali e aggiungo un complesso, diventa una collection di numeri complessi
  //      ... vabbè, per ora è solo un' idea, cmq si può implementare.
  var _elements = arguments[0];

  function getElements() { return _elements; };
};

module.exports = Collection;

