
function Group(arg) {
  var self = this;
};

Group.prototype.coerceToElement = function (element) {
  // TODO deve essere tipo unimplemented abstract method
  // fai una classe per tutti in modo tale da lanciare sempre lo stesso errore.
  throw new Error();
};

Group.prototype.neg = function (element) {
  try {
    var element = this.coerceToElement(element);
    return element.clone().neg();
  }
  catch (err) {}
};

Group.prototype.eq = function (element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.eq(element2);
  }
  catch (err) {}
};

Group.prototype.add = function (element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().add(element2);
  }
  catch (err) {}
};

Group.prototype.sub = function (element1, element2) {
  try {
    var element1 = this.coerceToElement(element1);
    return element1.clone().sub(element2);
  }
  catch (err) {}
};

Group.prototype.getZero = function () {
// TODO throw Error unimplemented abstract function
};

module.exports = Group;

