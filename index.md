---
title: algebra
---
# algebra

> Vectors, Matrices; Real, Complex, Quaternion; custom groups and rings for Node.js

**Table Of Contents:**

* [Status](#status)
* [Features](#features)
* [Installation](#installation)
* [Quick start](#quick-start)
    - [Scalars](#scalars)
    - [Vectors](#vectors)
    - [Matrices](#matrices)
* [License](#license)

[![Node engine](https://img.shields.io/node/v/algebra.svg)](https://nodejs.org/en/) [![NPM version](https://badge.fury.io/js/algebra.svg)](http://badge.fury.io/js/algebra) [![Build Status](https://travis-ci.org/fibo/algebra.svg?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://gemnasium.com/fibo/algebra.svg)](https://gemnasium.com/fibo/algebra) [![Coverage Status](https://coveralls.io/repos/fibo/algebra/badge.svg?branch=master)](https://coveralls.io/r/fibo/algebra?branch=master) [![Test page](https://img.shields.io/badge/test-page-blue.svg)](http://g14n.info/algebra/test) [![Change log](https://img.shields.io/badge/change-log-blue.svg)](https://github.com/fibo/algebra/blob/master/CHANGELOG.md)

[![Whatchers](http://g14n.info/svg/github/watchers/algebra.svg)](https://github.com/fibo/algebra/watchers) [![Stargazers](http://g14n.info/svg/github/stars/algebra.svg)](https://github.com/fibo/algebra/stargazers) [![Forks](http://g14n.info/svg/github/forks/algebra.svg)](https://github.com/fibo/algebra/network/members)

[![NPM](https://nodei.co/npm-dl/algebra.png)](https://nodei.co/npm-dl/algebra/)

![Algebra](http://g14n.info/algebra/images/Cover-Algebra.png) ![OnQuaternionsAndOctonions](http://g14n.info/algebra/images/Cover-OnQuaternionsAndOctonions.png)

## Status

*algebra* is under development, but API should not change until version **1.0**.

I am currently adding more tests and examples to achieve a stable version.

Many functionalities of previous versions are now in separated atomic packages:

* [algebra-group](http://npm.im/algebra-group)
* [algebra-ring](http://npm.im/algebra-ring)
* [cayley-dickson](http://npm.im/cayley-dickson)
* [indices-permutations](http://npm.im/indices-permutations)
* [laplace-determinant](http://npm.im/laplace-determinant)
* [multidim-array-index](http://npm.im/multidim-array-index)
* [tensor-contraction](http://npm.im/tensor-contraction)
* [tensor-permutation](http://npm.im/tensor-product)

## Features

* Real, Complex, Quaternion, Octonion numbers.
* [Vector](#vectors) and [Matrix](#matrices) spaces over any field (included [Real numbers](#scalars), of course :).
* Expressive syntax.
* [Immutable objects](https://en.wikipedia.org/wiki/Immutable_object).
* [math blog][1] with articles explaining algebra concepts and practical examples. I started [blogging about math](http://g14n.info/algebra/2015/08/i-love-math/) hoping it can help other people learning about the *Queen of Science*.

## Installation

With [npm](https://npmjs.org/) do

```bash
$ npm install algebra
```

With [bower](http://bower.io/) do

```bash
$ bower install algebra
```
or use a CDN adding this to your HTML page

```
<script src="https://cdn.rawgit.com/fibo/algebra/master/dist/algebra.min.js"></script>
```

## Quick start

> This is a 60 seconds tutorial to get your hands dirty with *algebra*.

All code in the examples below is intended to be contained into a single file.

[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=345763d95f093b9d9350)

First of all, import *algebra* package.

```
var algebra = require('algebra');
```

### Scalars

Use the Real numbers as scalars.

```
var R = algebra.Real;
```

Every operator is implemented both as a static function and as an object method.

Static operators return raw data, while class methods return object instances.

Use static addition operator to add three numbers.

```
console.log(R.add(1, 2, 3)); // 1 + 2 + 3 = 6
```

Create two real number objects: x = 2, y = -2

```
var x = new R(2),
    y = new R(-2);
```

The value *r* is the result of x multiplied by y.

```
var r = x.mul(y);
console.log(r.data); // 2 * (-2) = -4
console.log(x.data); // still 2
console.log(y.data); // still -2
```

Raw numbers are coerced, operators can be chained when it makes sense.
Of course you can reassign x, for example, x value will be 0.1: x -> x + 3 -> x * 2 -> x ^-1

```
x = x.add(3).mul(2).inv();
console.log(x.data); // ((2 + 3) * 2)^(-1) = 0.1
```

Comparison operators *equal* and *notEqual* are available, but they cannot be chained.

```
x.equal(0.1) // true
x.notEqual(Math.PI) // true
```

### Vectors

Create vector space of dimension 2 over Reals.

```
var R2 = algebra.VectorSpace(R)(2);
```

Create two vectors and add them.

```
var v1 = new R2([0, 1]);
var v2 = new R2([1, -2]);

// v1 -> v1 + v2 -> [0, 1] + [1, -2] = [1, -1]
v1 = v1.add(v2);

console.log(v1.data); // [1, -1]
```

### Matrices

Create space of matrices 3 x 2 over Reals.

```
var R3x2 = algebra.MatrixSpace(R)(3, 2);
```

Create a matrix.

```
//       | 1 1 |
//  m1 = | 0 1 |
//       | 1 0 |
//
var m1 = new R3x2([1, 1,
                   0, 1,
                   1, 0]);
```

Multiply m1 by v1, the result is a vector v3 with dimension 3.
In fact we are multiplying a 3 x 2 matrix by a 2 dimensional vector, but v1 is traited as a column vector so it is like a 2 x 1 matrix.

Then, following the row by column multiplication law we have

```
//  3 x 2  by  2 x 1  which gives a   3 x 1
//      ↑      ↑
//      +------+----→  by removing the middle indices.
//
//                   | 1 1 |
//    v3 = m1 * v1 = | 0 1 | * [1 , -1] = [0, -1, 1]
//                   | 1 0 |

var v3 = m1.mul(v1);

console.log(v3.data); // [0, -1, 1]
```

Let's try with two square matrices 2 x 2.

```
var R2x2 = algebra.MatrixSpace(R)(2, 2);

var m2 = new R2x2([1, 0,
                   0, 2]),
    m3 = new R2x2([0, -1,
                   1, 0]);

m2 = m2.mul(m3);

console.log(m2.data); // [0, -1,
                      //  2,  0]
```

Since m2 is a square matrix we can calculate its determinant.

```
console.log(m2.determinant.data); // 2
```

## License

[MIT](http://g14n.info/mit-license/)

[1]: http://g14n.info/algebra/articles "algebra blog"

