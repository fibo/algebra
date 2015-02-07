---
title: Quick start
---

This is a 60 seconds tutorial to get your hands dirty with *algebra*.

## Complex numbers

```js
var algebra = require('algebra');

var C = algebra.Complex;

// Create two complex numbers
// z1 = 1 + 2i
// z2 = 3 + 4i
var z1 = new C([1, 2]);
var z2 = new C([3, 4]);

// Multiply z1 by z2.
z1.mul(z2); // (1 + 2i) * (3 + 4i) = -5 + 10i

console.log(z1.data); // [-5, 10]

// Many chainable operators are available.
z1.conj().mul([2, 0]);

console.log(z1.data); // [-10, 20]
```

## Vectors

```js
var algebra = require('algebra');

// Rn is a class representing a real vector space of dimension = n
var V = algebra.VectorSpace;
var R = algebra.Real;

// Create a real vector space with dimension = 2, a.k.a. the cartesian plane
var R2 = V(R)(2);

// Create two vectors
// v1 = (1, 1)
// v2 = (2, 4)
var v1 = new R2([1, 1]);
var v2 = new R2([2, 4]);

// Add v2 to v1
v1.add(v2); // (1, 1) + (2, 4) = (3, 5)

console.log(v1.data); // [3, 5]
```

See also [real vector example](http://g14n.info/algebra/examples/real-vector).

## Matrices

```js
var algebra = require('algebra');

var M = algebra.MatrixSpace;
var R = algebra.Real;

// Create the space of 2x2 real matrices
var R2x2 = M(R)(2);

// Create two new invertible matrices:
//
//       | 1 2 |         | -1 0 |
//       | 3 4 |   and   |  0 1 |
//
var m1 = new R2x2([1, 2,
                   3, 4]);

var m2 = new R2x2([-1, 0,
                    0, 1]);

// Multiply m1 by m2 at right side
//
//       | 1 2 | * | -1 0 | = | -1 2 |
//       | 3 4 |   |  0 1 |   | -3 4 |
//
m1.mul(m2);

console.log(m1.data); // [-1, 2, -3, 4]

// Check out m1 determinant, should be 2 = (-1) * 4 - (-3) * 2
console.log(m1.determinant.data); // 2
```
