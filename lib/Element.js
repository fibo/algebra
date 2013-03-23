
var abstractMethod = require('./util/abstractMethod.js');

function Element() {
  var self = this;

//-----------------------------------------------------------------------------


// TODO se data è undefined devo creare l' oggetto Emptyness, il Vuoto

// TODO aggiusta e traduci: data lo meto come attributo, se uno lo modifica so cazzi sua
// in aggiunta però un element è un data con tutti i metodi per modificarlo, poi potrei anche mettere un name e altri attributi, ma non ha senso renderlo privato, se faccio getData e restituisco un puntatore all' oggetto posso sempre modificarlo

  self.data = arguments[0];

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

Element.prototype.clone = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Element;

