---
title: algebra
---
# algebra

> Vectors, Matrices; Real, Complex, Quaternion; custom groups and rings for Node.js

[![NPM version](https://badge.fury.io/js/algebra.png)](http://badge.fury.io/js/algebra) [![Build Status](https://travis-ci.org/fibo/algebra.png?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://gemnasium.com/fibo/algebra.png)](https://gemnasium.com/fibo/algebra) [![Coverage Status](https://coveralls.io/repos/fibo/algebra/badge.svg?branch=master)](https://coveralls.io/r/fibo/algebra?branch=master)

[![NPM](https://nodei.co/npm-dl/algebra.png)](https://nodei.co/npm-dl/algebra/)

![Algebra](http://g14n.info/algebra/images/Cover-Algebra.png) ![OnQuaternionsAndOctonions](http://g14n.info/algebra/images/Cover-OnQuaternionsAndOctonions.png)

## Status

*algebra* is under development, but API will not change until version **1.0**.
I am currently adding more tests and examples to achieve a stable version.
Many functionalities of previous versions are now in separated atomic packages like:
* [algebra-group](http://npm.im/algebra-group)
* [algebra-ring](http://npm.im/algebra-ring)
* [laplace-determinant](http://npm.im/laplace-determinant)

## Features

* Real, Complex, Quaternion, Octonion numbers.
* Vector and Matrix spaces over any field (included Real numbers, of course :).
* Expressive syntax.
<!-- * [math blog][1] with articles explaining algebra concepts and practical examples. -->

## Math blog

I started [blogging about math](http://g14n.info/algebra/2015/08/i-love-math/) hoping it can help other people learning math.
Please find here my [math articles][1].


Follows a list of recent posts.

{% include posts_list.html limit="5" %}

## Installation

With [npm](https://npmjs.org/) do

```bash
$ npm install algebra
```

With [bower](http://bower.io/) do

```bash
$ bower install algebra
```

## Synopsis

```
var algebra = require('algebra');

// Scalars
////////////////////////////////////////////////////////////////////////////////

var R = algebra.Real;

// Static addition operator.
console.log(R.add(1, 2, 3)); // 1 + 2 + 3 = 6

// Create two real numbers: x = 2, y = -1
var x = new R(2),
    y = new R(-2);

// Operators on objects are mutators.
// Here x value is modified, multipling it by y value.
x.mul(y);
console.log(x.data); // 2 * (-2) = -4

// Number coercion and chained operators.
// Resulting x value will be 0.25: x -> x + 6 -> x * 2 -> x ^-1
x.add(6).mul(2).inv();
console.log(x.data); // ((-4 + 6) * 2)^(-1) = 0.25

// Vectors
////////////////////////////////////////////////////////////////////////////////

// Create vector space of dimension 2 over Reals.
var R2 = algebra.VectorSpace(R)(2);

// Create two vectors and add them.
var v1 = new R2([0, 1]);
var v2 = new R2([1, -2]);

// v1 -> v1 + v2 -> [0, 1] + [1, -2] = [1, -1]
v1.add(v2);

console.log(v1.data); // [1, -1]

// Matrices
////////////////////////////////////////////////////////////////////////////////

// Create space of matrices 3x2 over Reals.
var R3x2 = algebra.MatrixSpace(R)(3, 2);

// Create a matrix
//                      | 1 1 |
//                 m1 = | 0 1 |
//                      | 1 0 |
//
var m1 = new R3x2([1, 1,
                  0, 1,
                  1, 0]);

// Multiply m1 by v1, the result is a vector v3 with dimension 3
// In fact we are multipling a 3 x 2 matrix by a 2 dimensional vector
// but v1 is traited as a column vector so it is like a 2 x 1 matrix.
//
// Then, following the row by column multiplication law we have
//
//     3 x 2  by  2 x 1  which gives a   3 x 1
//         ↑      ↑
//         +------+----→  by removing the middle indices.
//
//                      | 1 1 |
//       v3 = m1 * v1 = | 0 1 | * [1 , -1] = [0, -1, 1]
//                      | 1 0 |
//

var v3 = m1.mul(v1);

console.log(v3.data); // [0, -1, 1]

// But that was not a closed operation, so m1 is not mutated: otherwise it would
// be a matrix that become a vector which does not make sense.

// Let's try with two square matrices.
var R2x2 = algebra.MatrixSpace(R)(2, 2);

var m2 = new R2x2([1, 0,
                  0, 2]),
    m3 = new R2x2([0, -1,
                  1, 0]);

m2.mul(m3);

// This is an inner product, so mul is a mutator for m2.
console.log(m2.data); // [0, -1,
                      //  2,  0]

// Since m2 is a square matrix we can calculate its determinant.
console.log(m2.determinant.data); // 2
```

See also [algebra quick start](http://g14n.info/algebra/examples/quick-start).

## License

[MIT](http://g14n.info/mit-licence)

  [1]: http://g14n.info/algebra/articles "algebra blog"
