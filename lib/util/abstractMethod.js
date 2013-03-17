
var UnimplementedAbstractMethodException = require('../Exception/UnimplementedAbstractMethod.js');

function abstractMethod() {
  new UnimplementedAbstractMethodException();
};

module.exports = abstractMethod;

