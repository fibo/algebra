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
* [API](#api)
* [License](#license)

[![Node engine](https://img.shields.io/node/v/algebra.svg)](https://nodejs.org/en/) [![NPM version](https://badge.fury.io/js/algebra.svg)](http://badge.fury.io/js/algebra) [![Build Status](https://travis-ci.org/fibo/algebra.svg?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://gemnasium.com/fibo/algebra.svg)](https://gemnasium.com/fibo/algebra) [![Coverage Status](https://coveralls.io/repos/fibo/algebra/badge.svg?branch=master)](https://coveralls.io/r/fibo/algebra?branch=master) [![Test page](https://img.shields.io/badge/test-page-blue.svg)](http://g14n.info/algebra/test) [![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/algebra/changelog)

[![Whatchers](http://g14n.info/svg/github/watchers/algebra.svg)](https://github.com/fibo/algebra/watchers) [![Stargazers](http://g14n.info/svg/github/stars/algebra.svg)](https://github.com/fibo/algebra/stargazers) [![Forks](http://g14n.info/svg/github/forks/algebra.svg)](https://github.com/fibo/algebra/network/members)

[![NPM](https://nodei.co/npm-dl/algebra.png)](https://nodei.co/npm-dl/algebra/)

![Algebra](http://g14n.info/algebra/images/Cover-Algebra.png) ![OnQuaternionsAndOctonions](http://g14n.info/algebra/images/Cover-OnQuaternionsAndOctonions.png)

## Status

*algebra* is under development, but API should not change until version **1.0**.

I am currently adding more tests and examples to achieve a stable version.

Many functionalities of previous versions are now in separated atomic packages:

* [algebra-group](http://npm.im/algebra-group)
* [algebra-ring][algebra-ring]
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
* Everything is a Tensor.
* [Immutable objects](https://en.wikipedia.org/wiki/Immutable_object).
* [math blog][blog] with articles explaining algebra concepts and practical examples. I started [blogging about math](http://g14n.info/algebra/2015/08/i-love-math/) hoping it can help other people learning about the *Queen of Science*.

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

All code in the examples below should be contained into a single file, like [test/quickStart.js](https://github.com/fibo/algebra/blob/master/test/quickStart.js).

[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=345763d95f093b9d9350)

First of all, import *algebra* package.

```
var algebra = require('algebra')
```

### Scalars

Use the Real numbers as scalars.

```
var R = algebra.Real
```

Every operator is implemented both as a static function and as an object method.

Static operators return raw data, while class methods return object instances.

Use static addition operator to add three numbers.

```
console.log(R.add(1, 2, 3)) // 1 + 2 + 3 = 6
```

Create two real number objects: x = 2, y = -2

```
var x = new R(2)
var y = new R(-2)
```

The value *r* is the result of x multiplied by y.

```
var r = x.mul(y)
console.log(r.data) // 2 * (-2) = -4
console.log(x.data) // still 2
console.log(y.data) // still -2
```

Raw numbers are coerced, operators can be chained when it makes sense.
Of course you can reassign x, for example, x value will be 0.1: x -> x + 3 -> x * 2 -> x ^-1

```
x = x.add(3).mul(2).inv()
console.log(x.data) // ((2 + 3) * 2)^(-1) = 0.1
```

Comparison operators *equal* and *notEqual* are available, but they cannot be chained.

```
x.equal(0.1) // true
x.notEqual(Math.PI) // true
```

You can also play with Complexes.

```
var C = algebra.Complex

var z1 = new C([1, 2])
var z2 = new C([3, 4])

z1 = z1.mul(z2)

console.log(z1.data) // [-5, 10]

z1 = z1.conj().mul([2, 0])

console.log(z1.data) // [-10, -20]
```

### Vectors

Create vector space of dimension 2 over Reals.

```
var R2 = algebra.VectorSpace(R)(2)
```

Create two vectors and add them.

```
var v1 = new R2([0, 1])
var v2 = new R2([1, -2])

// v1 -> v1 + v2 -> [0, 1] + [1, -2] = [1, -1]
v1 = v1.add(v2)

console.log(v1.data) // [1, -1]
```

### Matrices

Create space of matrices 3 x 2 over Reals.

```
var R3x2 = algebra.MatrixSpace(R)(3, 2)
```

Create a matrix.

```
//       | 1 1 |
//  m1 = | 0 1 |
//       | 1 0 |
//
var m1 = new R3x2([1, 1,
                   0, 1,
                   1, 0])
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

var v3 = m1.mul(v1)

console.log(v3.data) // [0, -1, 1]
```

Let's try with two square matrices 2 x 2.

```
var R2x2 = algebra.MatrixSpace(R)(2, 2)

var m2 = new R2x2([1, 0,
                   0, 2])
var m3 = new R2x2([0, -1,
                   1, 0])

m2 = m2.mul(m3)

console.log(m2.data) // [0, -1,
                      //  2,  0]
```

Since m2 is a square matrix we can calculate its determinant.

```
console.log(m2.determinant.data) // 2
```

## API

### `Scalar(field[, n])`

Let's use for example the [src/booleanField][booleanField] which exports an object with all the stuff needed by [algebra-ring npm package][algebra-ring].

```
var Scalar = require('algebra').Scalar
var ring = require('algebra-ring')

var booleanField = require('algebra/src/booleanField')

// A field is a commutative ring.
var booleanRing = ring(booleanField)

var Bool = Scalar(booleanRing)

console.log(Bool.contains(true)) // true
console.log(Bool.contains(1)) // false

console.log(Bool.addition(true, false)) // true

var t = new Bool(true)
console.log(t.negation().data) // false
```

Not so exciting, let's build something more interesting.
Scalar accepts a second parameter, that is used to build a [Composition algebra][composition-algebra] over the given field.
It is something experimental also for me, right now I am writing this but I still do not know how it will behave.
My idea is that

> A byte is an octonion of booleans

Maybe we can discover some new byte operator, taken from octonion rich algebra structure.

```
// n must be a power of two
var Byte = Scalar(boolean, 8)
```

### `Scalar.addition(x1, x2[, x3, …, xn])`

### `scalar.addition(x1[, x2, …, xn])`

### `Scalar.subtraction(x1, x2[, x3, …, xn])`

### `scalar.subtraction(x1[, x2, …, xn])`

### `Scalar.addition(x1, x2[, x3, …, xn])`

### `scalar.addition(x1[, x2, …, xn])`

### Real

Inherits everything from Scalar.

### Complex

Inherits everything from Scalar.

### Quaternion

Inherits everything from Scalar.

### Octonion

Inherits everything from Scalar.

### `VectorSpace(field)(dimension)`

### `Vector.crossProduct(vector1, vector2)`

### `vector1.crossProduct(vector2)`

### `MatrixSpace(field)(numRows[, numCols])`

### `TensorSpace(field)(indices)`

## License

[MIT](http://g14n.info/mit-license/)

[blog]: http://g14n.info/algebra/articles "algebra blog"
[algebra-ring]: http://npm.im/algebra-ring "algebra-ring"
composition-algebra]: https://en.wikipedia.org/wiki/Composition_algebra "Composition algebra"
[booleanField]: https://github.com/fibo/algebra/blob/master/src/booleanField.js "boolean field"
[realField]: https://github.com/fibo/algebra/blob/master/src/realField.js "real field"
