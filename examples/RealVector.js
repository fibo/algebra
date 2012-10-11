
//First of all we need a space, for instance R3.

var algebra = require('../index.js');

var Rn = require('../index.js').Real.VectorSpace;

var R3 = new Rn(3);

//Then we can ask the R3 space to give us a vector.

var v1 = new R3.Vector(1, 0, 1);

//Let see the elements of our brand new vector v1.

console.log(v1.getElements());

//The easiest operator is scalar multiplication.

v1.scalar(2);

//Now the elements of v1 are [2, 0, 0].

console.log(v1.getElements());

//You can also add v1 to itself.

v1.add(v1);

//The neutral element for addition operator is the zero vector.
//Hey R3, can you give me your zero vector?

var zero = R3.getZero();

//You can see that adding or subtracting zero does not change v1 coordinates.

    v1.add(zero);
    v1.sub(zero);

