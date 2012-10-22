
function Group(arg) {
  var self = this;
}

Group.prototype.neg = function(element) {
  return element.clone().neg();
}

Group.prototype.eq = function(element1, element2) {
  return element1.eq(element2);
}

Group.prototype.add = function(element1, element2) {
  return element1.clone().add(element2);
}

Group.prototype.sub = function(element1, element2) {
  return element1.clone().sub(element2);
}

Group.prototype.getZero = function() {
// TODO throw Error unhimplemented abstract function
}

module.exports = Group;

