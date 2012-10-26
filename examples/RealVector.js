
//First of all we need a space, for instance R3.

var algebra = require('algebra');

var Rn = algebra.Real.VectorSpace;

var R3 = new Rn(3);

//Then we can ask the R3 space to give us a vector.
//The constructor arguments are the elements of the vector.
//Since we are using R3, i.e. the three dimensional euclidean space,
//the elements are real numbers.

var v1 = new R3.Vector(1, 0, 1);

//You can see the coordinates of our brand new vector v1.

console.log(v1.getCoordinates());

//The easiest operator is scalar multiplication.

v1.scalar(2);

//Now the elements of v1 are (2, 0, 2).

console.log(v1.getCoordinates());

//You can also add v1 to itself.

v1.add(v1);

//The neutral element for addition operator is the zero vector.
//Hey R3, can you give me your zero vector?

var zero = R3.getZero();

//You can see that adding or subtracting zero does not change v1 coordinates.

v1.add(zero);
v1.sub(zero);

//Create another vector, to play with binary operators.

var v2 = new R3.Vector(0, 1, 0);

//It is defined a dot product in every Rn. It returns a real number: when this 
//number is zero, it means that the vectors are orthogonal.

if (v1.dot(v2).eq(0)) {
  console.log('v1 and v2 are orthogonal');
}

//There is also a shortcut to check orthogonality, the "ortho" method, see below.

//Since we are in R3, it is also defined a cross product.
//The cross product is an (dim-1)-ary operator, so in R3 it is binary.

var v3 = v1.cross(v2);

//Now we have three vectors v1, v2, v3 that are orthogonal and spans R3: they form a basis.

if (v1.ortho(v2) && v1.ortho(v3) && v2.ortho(v3)) {
  console.log('<v1, v2, v3> is a basis of R3');
}
