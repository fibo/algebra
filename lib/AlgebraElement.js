var AlgebraElement;

AlgebraElement = (function() {
  function AlgebraElement(data, field) {
    this.data = data;
    this.field = field;
  }

  AlgebraElement.addition = function(element) {
    this.data = this.field.addition(this, element);
    return this;
  };

  AlgebraElement.add = AlgebraElement.addition;

  AlgebraElement.subtraction = function(element) {
    this.data = this.field.subtraction(this, element);
    return this;
  };

  AlgebraElement.sub = AlgebraElement.subtraction;

  AlgebraElement.equal = function(element) {
    return this.field.equal(this, element);
  };

  AlgebraElement.eq = AlgebraElement.equal;

  AlgebraElement.notEqual = function(element) {
    return this.field.notEqual(this, element);
  };

  AlgebraElement.ne = AlgebraElement.notEqual;

  return AlgebraElement;

})();

module.exports = AlgebraElement;
