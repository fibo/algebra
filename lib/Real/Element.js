
var Complex = require('../Complex/Element.js');

function RealElement(arg) {

  var value = arg;
  this.getValue = function() { return value; }

  var addReal = function() {}
  var addComplex = function() {}

  this.add = function(arg) {
    switch (instanceof arg) {
      case 'number':
        value += arg;
        return self;
        break;
      case 'RealElement':
        value += arg.getValue();
        return self;
        break;
      case 'ComplexElement':
        return new Complex(value + arg.re());
        break;
    }
  }

}

module.exports = RealElement;

