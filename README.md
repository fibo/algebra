# algebra

> Vectors, Matrices; Real, Complex, Quaternion; custom groups and rings for Node.js

**Table Of Contents:**

* [Status](#status)
* [Features](#features)
* [Installation](#installation)
* [Quick start](#quick-start)
  1. [Scalars](#scalars)
  2. [Vectors](#vectors)
  3. [Matrices](#matrices)
* [API](#api)
  - [About operators](#about-operators)
  - [Scalar](#scalar)
    - [attributes](#scalar-attributes)
      - [one](#scalarone)
      - [zero](#scalarzero)
      - [data](#scalardata)
      - [order](#scalar-order)
    - [operators](#scalar-operators)
  - [Cyclic](#cyclic)
  - [Real](#real)
  - [Complex](#complex)
  - [Quaternion](#quaternion)
  - [Octonion](#octonion)
  - [Common spaces](#common-spaces)
    - [R2](#r2)
    - [R3](#r3)
  - [Vector](#vector)
    - [attributes](#vector-attributes)
    - [operators](#vector-operators)
      - [cross product](#cross-product)
  - [Matrix](#matrix)
    - [attributes](#matrix-attributes)
      - [isSquare](#matrixissquare)
      - [numCols](#matrixnumcols)
      - [numRows](#matrixnumrows)
    - [operators](#matrix-operators)
      - [multiplication](#matrix-multiplication)
      - [inversion](#matrix-inversion)
      - [determinant](#matrix-determinant)
      - [adjoint](#matrix-adjoint)
  - [Tensor](#tensor)
    - [attributes](#tensor-attributes)
      - [one](#tensorone)
      - [zero](#tensorzero)
      - [data](#tensordata)
      - [indices](#tensor-indices)
      - [order](#tensor-order)
    - [operators](#tensor-operators)
      - [equality](#tensor-equality)
      - [scalarMultiplication](#scalar-multiplication)
* [License](#license)

[![Node engine](https://img.shields.io/node/v/algebra.svg)](https://nodejs.org/en/) [![NPM version](https://badge.fury.io/js/algebra.svg)](http://badge.fury.io/js/algebra) [![Build Status](https://travis-ci.org/fibo/algebra.svg?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://gemnasium.com/fibo/algebra.svg)](https://gemnasium.com/fibo/algebra) [![Coverage Status](https://coveralls.io/repos/fibo/algebra/badge.svg?branch=master)](https://coveralls.io/r/fibo/algebra?branch=master) [![Test page](https://img.shields.io/badge/test-page-blue.svg)](http://g14n.info/algebra/test) [![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/algebra/changelog)

[![Whatchers](http://g14n.info/svg/github/watchers/algebra.svg)](https://github.com/fibo/algebra/watchers) [![Stargazers](http://g14n.info/svg/github/stars/algebra.svg)](https://github.com/fibo/algebra/stargazers) [![Forks](http://g14n.info/svg/github/forks/algebra.svg)](https://github.com/fibo/algebra/network/members)

[![NPM](https://nodei.co/npm-dl/algebra.png)](https://nodei.co/npm-dl/algebra/)

![Algebra](http://g14n.info/algebra/images/Cover-Algebra.png) ![OnQuaternionsAndOctonions](http://g14n.info/algebra/images/Cover-OnQuaternionsAndOctonions.png)

## Status

*algebra* is under development, but API should not change until version **1.0**.

I am currently adding more tests and examples to achieve a stable version.

Many functionalities of previous versions are now in separated atomic packages:

* [algebra-cyclic](http://npm.im/algebra-cyclic)
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

### About operators

All operators are implemented as static methods and as object methods.
In both cases, operands are coerced to raw data.
As an example, consider addition of vectors in a plane.

```
var R2 = algebra.R2

var vector1 = new R2([1, 2])
var vector2 = new R2([3, 4])
```

The following static methods, give the same result: `[4, 6]`.

```
R2.addition(vector1, [3, 4])
R2.addition([1, 2], vector2)
R2.addition(vector1, vector2)
```

The following object methods, give the same result: a vector instance with data `[4, 6]`.

```
var vector3 = vector1.addition([3, 4])
var vector4 = vector1.addition(vector2)
```

Operators can be chained and accept multiple arguments when it makes sense.

```
vector1.addition(vector1, vector1).equality([4, 6]) // true
```

Objects are immutable

```
console.log(vector1.data) // still [1, 2]
```

### Scalar

##### `Scalar(field[, n])`

Let's use for example the [src/booleanField][booleanField] which exports an object with all the stuff needed by [algebra-ring npm package][algebra-ring].

```
var algebra = require('algebra')
var Scalar = algebra.Scalar
var ring = require('algebra-ring')

var booleanField = require('algebra/src/booleanField')

var Bool = Scalar(booleanField)

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
// TODO var Byte = Scalar(boolean, 8)
```

### Scalar attributes

##### `Scalar.one`

##### `Scalar.zero`

#### Scalar order

It is always 0.

##### `Scalar.order`

##### `scalar.order`

##### `scalar.data`

### Scalar operators

##### `Scalar.contains(scalar1, scalar2[, scalar3, … ])`

##### `Scalar.equality(scalar1, scalar2)`

##### `scalar1.equality(scalar2)`

##### `Scalar.disequality(scalar1, scalar2)`

##### `scalar1.disequality(scalar2)`

##### `Scalar.addition(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.addition(scalar2[, scalar3, … ])`

##### `Scalar.subtraction(scalar1, scalar2[, … ])`

##### `scalar1.subtraction(scalar2[, scalar3, … ])`

##### `Scalar.multiplication(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.multiplication(scalar2[, scalar3, … ])`

##### `Scalar.division(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.division(scalar2[, scalar3, … ])`

##### `Scalar.negation(scalar)`

##### `scalar.negation()`

##### `Scalar.inversion(scalar)`

##### `scalar.inversion()`

##### `Scalar.conjugation(scalar)`

##### `scalar.conjugation()`

### Real

Inherits everything from [Scalar](#scalar).

```
var Real = algebra.Real
```

### Complex

Inherits everything from [Scalar](#scalar).

```
var Complex = algebra.Complex

var complex1 = new Complex([1, 2])
```

### Quaternion

Inherits everything from [Scalar](#scalar).

### Octonion

Inherits everything from [Scalar](#scalar).

### Common spaces

#### R2

The real plane.

```
var R2 = algebra.R2
```

It is in alias of `VectorSpace(Real)(2)`.

#### R3

The real space.

```
var R3 = algebra.R3
```

It is in alias of `VectorSpace(Real)(3)`.

### Vector

Inherits everything from [Tensor](#tensor).

##### `VectorSpace(Scalar)(dimension)`

### Vector attributes

##### `Vector.dimension`

### Vector operators

#### Cross product

It is defined only in dimension three. See [Cross product on wikipedia](https://en.wikipedia.org/wiki/Cross_product).

##### `Vector.crossProduct(vector1, vector2)`

```
R3.crossProduct([3, -3, 1], [4, 9, 2]) // [-15, 2, 39]
```

##### `vector1.crossProduct(vector2)`

```
var vector1 = new R3([3, -3, 1])
var vector2 = new R3([4, 9, 2])

var vector3 = vector1.crossProduct(vector2)

console.log(vector3.data) // [-15, 2, 39]
```

### Matrix

Inherits everything from [Tensor](#tensor).

##### `MatrixSpace(Scalar)(numRows[, numCols])`

#### Matrix attributes

##### `Matrix.isSquare`

##### `Matrix.numCols`

##### `Matrix.numRows`

#### Matrix operators

#### Matrix multiplication

##### `Matrix.multiplication(matrix1, matrix2)`

##### `matrix1.multiplication(matrix2)`

#### Matrix inversion

It is defined only for square matrices which determinant is not zero.

##### `Matrix.inversion(matrix)`

##### `matrix.inversion`

#### Matrix determinant

It is defined only for square matrices.

##### `Matrix.determinant(matrix)`

##### `matrix.determinant`

#### Matrix adjoint

##### `Matrix.adjoint(matrix1)`

##### `matrix.adjoint`

### Tensor

##### `TensorSpace(Scalar)(indices)`

### Tensor attributes

##### `Tensor.one`

##### `Tensor.zero`

##### `tensor.data`

#### Tensor indices

##### `Tensor.indices`

##### `tensor.indices`

#### Tensor order

##### `Tensor.order`

##### `tensor.order`

### Tensor operators

##### `Tensor.contains(tensor1, tensor2[, tensor3, … ])`

#### Tensor equality

```
var T2x2x2 = TensorSpace(Real)([2, 2, 2])
var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])
```

##### `Tensor.equality(tensor1, tensor2)`

```
T2x2x2.equality(tensor1, tensor1) // true
T2x2x2.equality(tensor1, tensor2) // false
```

##### `tensor1.equality(tensor2)`

```
tensor1.equality(tensor1) // true
tensor2.equality(tensor2) // false
```

##### `Tensor.disequality(tensor1, tensor2)`

##### `tensor1.disequality(tensor2)`

##### `Tensor.addition(tensor1, tensor2[, tensor3, … ])`

##### `tensor1.addition(tensor2[, tensor3, … ])`

##### `Tensor.subtraction(tensor1, tensor2[, tensor3, … ])`

##### `tensor1.subtraction(tensor2[, tensor3, … ])`

##### `Tensor.product(tensor1, tensor2)`

##### `tensor1.product(tensor2)`

##### `Tensor.contraction()`

##### `tensor.contraction()`

##### `Tensor.negation(tensor1)`

##### `tensor.negation()`

#### Scalar multiplication

##### `Tensor.scalarMultiplication(tensor, scalar)`

##### `tensor.scalarMultiplication(scalar)`

## License

[MIT](http://g14n.info/mit-license/)

[blog]: http://g14n.info/algebra/articles "algebra blog"
[algebra-ring]: http://npm.im/algebra-ring "algebra-ring"
[composition-algebra]: https://en.wikipedia.org/wiki/Composition_algebra "Composition algebra"
[booleanField]: https://github.com/fibo/algebra/blob/master/src/booleanField.js "boolean field"
[realField]: https://github.com/fibo/algebra/blob/master/src/realField.js "real field"
