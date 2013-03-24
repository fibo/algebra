
var abstractMethod = require('./util/abstractMethod.js');

function Element() {
  var self = this;

//-----------------------------------------------------------------------------


// TODO se data è undefined devo creare l' oggetto Emptyness, il Vuoto

  var _data = arguments[0];

  function getData() { return _data; };

  self.getData = getData;

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

Element.prototype.clone = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Element;

