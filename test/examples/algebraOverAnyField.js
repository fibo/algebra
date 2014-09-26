
// # Algebra over any field
//
// Let's create an algebra over the boolean field.

var algebra  = require('algebra')
  , inherits = require('inherits');

var AlgebraField = algebra.AlgebraField;

function BooleanField () {
  var zero = false;

  var one = true;

  /*function validate (data) {
    return typeof data === 'boolean'
  }*/

  AlgebraField.call(this, zero, one);
}

inherits(BooleanField, AlgebraField);


// Create an instance of boolean field

var bool = new BooleanField();
