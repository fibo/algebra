
function UnimplementedAbstractMethod() {
  var self = this;

  // TODO message attribute, and inherit from Generic Exception
  // TODO emit error
  // TODO also provide a listener
  console.error('Abstract method');

  // TODO per ora sto sul grezzo
  console.error(arguments);
};

module.exports = UnimplementedAbstractMethod;

