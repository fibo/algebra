# algebra

> Vectors, Matrices; Real, Complex, Quaternion; custom groups and rings for Node.js

> **New**: checkout matrices and vectors made of strings, with [cyclic algebra](#cyclic).

**NOTA BENE** Immagine all code examples below as written in some REPL where expected output is documented as a comment.

[![NPM version](https://badge.fury.io/js/algebra.svg)](http://badge.fury.io/js/algebra) [![Badge size](https://badge-size.herokuapp.com/fibo/algebra/master/dist/algebra.min.js)](https://github.com/fibo/algebra/blob/master/dist/algebra.min.js) [![Build Status](https://travis-ci.org/fibo/algebra.svg?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://david-dm.org/fibo/algebra.svg)](https://david-dm.org/fibo/algebra) [![Coverage Status](https://coveralls.io/repos/fibo/algebra/badge.svg?branch=master)](https://coveralls.io/r/fibo/algebra?branch=master) [![Test page](https://img.shields.io/badge/test-page-blue.svg)](http://g14n.info/algebra/test) [![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/algebra/changelog)

[![Whatchers](https://g14n.info/svg/github/watchers/algebra.svg)](https://github.com/fibo/algebra/watchers) [![Stargazers](https://g14n.info/svg/github/stars/algebra.svg)](https://github.com/fibo/algebra/stargazers) [![Forks](https://g14n.info/svg/github/forks/algebra.svg)](https://github.com/fibo/algebra/network/members)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![NPM](https://nodei.co/npm-dl/algebra.png)](https://nodei.co/npm-dl/algebra/)

![Algebra](http://g14n.info/algebra/images/Cover-Algebra.png) ![OnQuaternionsAndOctonions](http://g14n.info/algebra/images/Cover-OnQuaternionsAndOctonions.png)

## Table Of Contents

* [Status](#status)
* [Features](#features)
* [Installation](#installation)
* [Quick start](#quick-start)
  1. [Scalars](#scalars)
  2. [Vectors](#vectors)
  3. [Matrices](#matrices)
* [API](#api)
  - [About operators](#about-operators)
  - [Cyclic](#cyclic)
  - [Composition Algebra](#composition-algebra)
  - [Scalar](#scalar)
  - [Real](#real)
  - [Complex](#complex)
  - [Quaternion](#quaternion)
  - [Octonion](#octonion)
  - [Common spaces](#common-spaces)
  - [Vector](#vector)
  - [Matrix](#matrix)
  - [Tensor](#tensor)
* [License](#license)

## Status

*algebra* is under development, but API should not change until version **1.0**.

I am currently adding more tests and examples to achieve a stable version.

Many functionalities of previous versions are now in separated atomic packages:

* [algebra-cyclic]
* [algebra-group]
* [algebra-ring]
* [cayley-dickson]
* [indices-permutations]
* [laplace-determinant]
* [matrix-multiplication]
* [multidim-array-index]
* [tensor-contraction]
* [tensor-permutation]

## Features

* Real, Complex, Quaternion, Octonion numbers.
* [Vector](#vectors) and [Matrix](#matrices) spaces over any field (included [Real numbers](#real), of course :).
* Expressive syntax.
* Everything is a Tensor.
* [Immutable objects](https://en.wikipedia.org/wiki/Immutable_object).
* [math blog][blog] with articles explaining algebra concepts and practical examples. I started [blogging about math](http://g14n.info/algebra/2015/08/i-love-math/) hoping it can help other people learning about the *Queen of Science*.

## Installation

With [npm] do

```bash
npm install algebra
```

With [bower] do

```bash
bower install algebra
```
or use a CDN adding this to your HTML page

```html
<script src="https://cdn.rawgit.com/fibo/algebra/master/dist/algebra.js"></script>
```

## Quick start

> This is a 60 seconds tutorial to get your hands dirty with *algebra*.

First of all, import *algebra* package.

```javascript
const algebra = require('algebra')
```

### Try it out

All code in the examples below should be contained into a single file, like [test/quickStart.js](https://github.com/fibo/algebra/blob/master/test/quickStart.js).

<ul class="box">
<li class="tonicdev"><a href="https://tonicdev.com/fibo/algebra-quick-start" target="_blank">Test algebra <em>quick start</em> in your browser.</a></li>
</ul>

[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=345763d95f093b9d9350)

### Scalars

Use the Real numbers as scalars.

```javascript
const R = algebra.Real
```

Every operator is implemented both as a static function and as an object method.

Static operators return raw data, while class methods return object instances.

Use static addition operator to add three numbers.

```javascript
R.add(1, 2, 3) // 1 + 2 + 3 = 6
```

Create two real number objects: x = 2, y = -2

```javascript
const x = new R(2)
const y = new R(-2)
```

The value *r* is the result of x multiplied by y.

```javascript
// 2 * (-2) = -4
var r = x.mul(y)

r // Scalar { data: -4 }

// x and y are not changed
x.data // 2
y.data // -2
```

Raw numbers are coerced, operators can be chained when it makes sense.
Of course you can reassign x, for example, x value will be 0.1: x -> x + 3 -> x * 2 -> x ^-1

```javascript
// ((2 + 3) * 2)^(-1) = 0.1
x = x.add(3).mul(2).inv()

x // Scalar { data: 0.1 }
```

Comparison operators *equal* and *notEqual* are available, but they cannot be chained.

```javascript
x.equal(0.1) // true
x.notEqual(Math.PI) // true
```

You can also play with Complexes.

```javascript
const C = algebra.Complex

let z1 = new C([1, 2])
const z2 = new C([3, 4])

z1 = z1.mul(z2)

z1 // Scalar { data: [-5, 10] }

z1 = z1.conj().mul([2, 0])

z1.data // [-10, -20]
```

### Vectors

Create vector space of dimension 2 over Reals.

```javascript
const R2 = algebra.VectorSpace(R)(2)
```

Create two vectors and add them.

```javascript
let v1 = new R2([0, 1])
const v2 = new R2([1, -2])

// v1 -> v1 + v2 -> [0, 1] + [1, -2] = [1, -1]
v1 = v1.add(v2)

v1 // Vector { data: [1, -1] }
```

### Matrices

Create space of matrices 3 x 2 over Reals.

```javascript
const R3x2 = algebra.MatrixSpace(R)(3, 2)
```

Create a matrix.

```javascript
//       | 1 1 |
//  m1 = | 0 1 |
//       | 1 0 |
//
const m1 = new R3x2([1, 1,
                   0, 1,
                   1, 0])
```

Multiply m1 by v1, the result is a vector v3 with dimension 3.
In fact we are multiplying a 3 x 2 matrix by a 2 dimensional vector, but v1 is traited as a column vector so it is like a 2 x 1 matrix.

Then, following the row by column multiplication law we have

```javascript
//  3 x 2  by  2 x 1  which gives a   3 x 1
//      ↑      ↑
//      +------+----→  by removing the middle indices.
//
//                   | 1 1 |
//    v3 = m1 * v1 = | 0 1 | * [1 , -1] = [0, -1, 1]
//                   | 1 0 |

const v3 = m1.mul(v1)

v3.data // [0, -1, 1]
```

Let's try with two square matrices 2 x 2.

```javascript
const R2x2 = algebra.MatrixSpace(R)(2, 2)

let m2 = new R2x2([1, 0,
                   0, 2])

const m3 = new R2x2([0, -1,
                     1, 0])

m2 = m2.mul(m3)

m2 // Matrix { data: [0, -1, 2, 0] }
```

Since m2 is a square matrix we can calculate its determinant.

```javascript
m2.determinant // Scalar { data: 2 }
```

## API

### About operators

All operators are implemented as static methods and as object methods.
In both cases, operands are coerced to raw data.
As an example, consider addition of vectors in a plane.

```javascript
const R2 = algebra.R2

const vector1 = new R2([1, 2])
const vector2 = new R2([3, 4])
```

The following static methods, give the same result: `[4, 6]`.

```javascript
R2.addition(vector1, [3, 4])
R2.addition([1, 2], vector2)
R2.addition(vector1, vector2)
```

The following object methods, give the same result: a vector instance with data `[4, 6]`.

```javascript
const vector3 = vector1.addition([3, 4])
const vector4 = vector1.addition(vector2)

R2.equal(vector3, vector4) // true
```

Operators can be chained and accept multiple arguments when it makes sense.

```javascript
vector1.addition(vector1, vector1).equality([4, 6]) // true
```

Objects are immutable

```javascript
vector1.data // still [1, 2]
```

### Cyclic

#### `Cyclic(elements)`

Create an algebra cyclic ring, by passing its elements. The elements are provided
as a string or an array, which lenght must be a prime number. This is necessary,
otherwise the result would be a wild land where you can find [zero divisor][zero_divisor] beasts.


Let's create a cyclic ring containing lower case letters, numbers and the blank
char. How many are they? They are 26 + 10 + 1 = 37, that is prime! We like it.

```javascript
const Cyclic = algebra.Cyclic

// The elements String or Array length must be prime.
const elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

const Alphanum = Cyclic(elements)
```

Operators derive from modular arithmetic

```javascript
const a = new Alphanum('a')

Alphanum.addition('a', 'b') // 'c'
```

You can also create element instances, and do any kind of operations.

```javascript
const x = new Alphanum('a')

const y = x.add('c', 'a', 't')
           .mul('i', 's')
           .add('o', 'n')
           .sub('t', 'h', 'e')
           .div('t', 'a', 'b', 'l', 'e')

y.data // 's'
```

Yes, they are [scalars](#scalar) so you can build vector or matrix spaces on top of them.

```javascript
const VectorStrings2 = algebra.VectorSpace(Alphanum)(2)
const MatrixStrings2x2 = algebra.MatrixSpace(Alphanum)(2)
const
const vectorOfStrings = new VectorStrings2(['o', 'k'])
const matrixOfStrings = new MatrixStrings2x2(['c', 'o',
                                              'o', 'l'])

matrixOfStrings.mul(vectorOfStrings).data // ['x', 'y']
```

Note that, in the particular example above, since the matrix is simmetric
it commutes with the vector, hence changing the order of the operands
the result is still the same.

```javascript
vectorOfStrings.mul(matrixOfStrings).data // ['x', 'y']
```

### CompositionAlgebra

A [composition algebra][composition-algebra] is one of ℝ, ℂ, ℍ, O:
Real, Complex, Quaternion, Octonion.
A generic function is provided to iterate the [Cayley-Dickson construction][Cayley-Dickson_construction] over any field.

#### `CompositionAlgebra(field[, num])`

* num can be 1, 2, 4 or 8

Let's use for example the [src/binaryField][binaryField] which exports an object with all the stuff needed by [algebra-ring npm package][algebra-ring].

```javascript
const CompositionAlgebra = algebra.CompositionAlgebra

const binaryField = require('algebra/src/binaryField')

const Bit = CompositionAlgebra(binaryField)

Bit.contains(1) // true
Bit.contains(4) // false

const bit = new Bit(1)
Bit.addition(0).data // 1
```

Not so exciting, let's build something more interesting.
Let's pass a second parameter, that is used to build a [Composition algebra][composition-algebra] over the given field.
It is something **experimental** also for me, right now I am writing this but I still do not know how it will behave. My idea is that

> A byte is an octonion of bits

Maybe we can discover some new byte operator, taken from octonion rich algebra structure.
Create an octonion algebra over the binary field, a.k.a Z2 and create the
eight units.

```javascript
// n must be a power of two
const Byte = CompositionAlgebra(binaryField, 8)

const byte1 = new Byte([1, 0, 0, 0, 0, 0, 0, 0])
const byte2 = new Byte([0, 1, 0, 0, 0, 0, 0, 0])
const byte3 = new Byte([0, 0, 1, 0, 0, 0, 0, 0])
const byte4 = new Byte([0, 0, 0, 1, 0, 0, 0, 0])
const byte5 = new Byte([0, 0, 0, 0, 1, 0, 0, 0])
const byte6 = new Byte([0, 0, 0, 0, 0, 1, 0, 0])
const byte7 = new Byte([0, 0, 0, 0, 0, 0, 1, 0])
const byte8 = new Byte([0, 0, 0, 0, 0, 0, 0, 1])
```

The first one corresponds to *one*, while the rest are immaginary units,
but since the underlying field is Z2, -1 corresponds to 1.

```javascript
byte1.mul(byte1).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte2.mul(byte2).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte3.mul(byte3).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte4.mul(byte4).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte5.mul(byte5).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte6.mul(byte6).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte7.mul(byte7).data // [1, 0, 0, 0, 0, 0, 0, 0]
byte8.mul(byte8).data // [1, 0, 0, 0, 0, 0, 0, 0]
```

Keeping in mind that *Byte* space defined above is an algebra, i.e. it has
composition laws well defined, you maybe already noticed that, for example
*byte2* could be seen as corresponding to 4, but in this strange structure
we created, 4 * 4 = 2.

You can play around with this structure.

```javascript
const max = byte1.add(byte2).add(byte3).add(byte4)
                 .add(byte5).add(byte6).add(byte7).add(byte8)

max.data // [1, 1, 1, 1, 1, 1, 1, 1]
```

### Scalar

#### Scalar attributes

##### `Scalar.one`

##### `Scalar.zero`

#### Scalar order

It is always 0 for scalars, see also [tensor order](#tensor-order).

##### `Scalar.order`

##### `scalar.order`

##### `scalar.data`

### Scalar operators

#### Scalar set operators

##### `Scalar.contains(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.belongsTo(Scalar)`

#### Scalar equality

##### `Scalar.equality(scalar1, scalar2)`

##### `scalar1.equality(scalar2)`

#### Scalar disequality

##### `Scalar.disequality(scalar1, scalar2)`

##### `scalar1.disequality(scalar2)`

#### Scalar addition

##### `Scalar.addition(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.addition(scalar2[, scalar3, … ])`

#### Scalar subtraction

##### `Scalar.subtraction(scalar1, scalar2[, … ])`

##### `scalar1.subtraction(scalar2[, scalar3, … ])`

#### Scalar multiplication

##### `Scalar.multiplication(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.multiplication(scalar2[, scalar3, … ])`

#### Scalar division

##### `Scalar.division(scalar1, scalar2[, scalar3, … ])`

##### `scalar1.division(scalar2[, scalar3, … ])`

#### Scalar negation

##### `Scalar.negation(scalar)`

##### `scalar.negation()`

#### Scalar inversion

##### `Scalar.inversion(scalar)`

##### `scalar.inversion()`

#### Scalar conjugation

##### `Scalar.conjugation(scalar)`

##### `scalar.conjugation()`

### Real

Inherits everything from [Scalar](#scalar).

```javascript
const Real = algebra.Real

Real.addition(1, 2) // 3

const pi = new Real(Math.PI)
const twoPi = pi.mul(2)

Real.subtraction(twoPi, 2 * Math.PI) // 0
```

### Complex

Inherits everything from [Scalar](#scalar).

```javascript
const Complex = algebra.Complex

const complex1 = new Complex([1, 2])

complex1.conjugation() // Complex { data: [1, -2] }
```

### Quaternion

Inherits everything from [Scalar](#scalar).

### Octonion

Inherits everything from [Scalar](#scalar).

### Common spaces

#### R

The real line.

It is in alias of [Real](#real).

```javascript
const R = algebra.R
```

#### R2

The real plane.

```javascript
const R2 = algebra.R2
```

It is in alias of `VectorSpace(Real)(2)`.

#### R3

The real space.

```javascript
const R3 = algebra.R3
```

It is in alias of `VectorSpace(Real)(3)`.

#### R2x2

Real square matrices of rank 2.

```javascript
const R2x2 = algebra.R2x2
```

It is in alias of `MatrixSpace(Real)(2)`.

#### C

The complex numbers.

It is in alias of [Complex](#complex).

```javascript
const C = algebra.C
```

#### H

Usually it is used the **H** in honour of [Sir Hamilton](https://en.wikipedia.org/wiki/William_Rowan_Hamilton).

It is in alias of [Quaternion](#quaternion).

```javascript
const H = algebra.H
```

### Vector

Inherits everything from [Tensor](#tensor).

##### `VectorSpace(Scalar)(dimension)`

### Vector attributes

#### Vector dimension

##### `Vector.dimension`

```javascript
R2.dimension // 2
```

##### `vector.dimension`

```javascript
const vector = new R2([1, 1])

vector.dimension // 2
```

### Vector operators

#### Addition

##### `Vector.addition(vector1, vector2)`

```javascript
R2.addition([2, 1], [1, 2]) // [3, 3]
```

##### `vector1.addition(vector2)`

```javascript
const vector1 = new R2([2, 1])
const vector2 = new R2([2, 2])

const vector3 = vector1.addition(vector2)

vector3 // Vector { data: [4, 3] }
```

#### Cross product

It is defined only in dimension three. See [Cross product on wikipedia](https://en.wikipedia.org/wiki/Cross_product).

##### `Vector.crossProduct(vector1, vector2)`

```javascript
R3.crossProduct([3, -3, 1], [4, 9, 2]) // [-15, 2, 39]
```

##### `vector1.crossProduct(vector2)`

```javascript
const vector1 = new R3([3, -3, 1])
const vector2 = new R3([4, 9, 2])

const vector3 = vector1.crossProduct(vector2)

vector3 // Vector { data: [-15, 2, 39] }
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

It represents the number of varying indices.

* A scalar has order 0.
* A vector has order 1.
* A matrix has order 2.

##### `Tensor.order`

##### `tensor.order`

### Tensor operators

##### `Tensor.contains(tensor1, tensor2[, tensor3, … ])`

#### Tensor equality

```javascript
const T2x2x2 = TensorSpace(Real)([2, 2, 2])

const tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
const tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])
```

##### `Tensor.equality(tensor1, tensor2)`

```javascript
T2x2x2.equality(tensor1, tensor1) // true
T2x2x2.equality(tensor1, tensor2) // false
```

##### `tensor1.equality(tensor2)`

```javascript
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

#### Tensor multiplication

##### `Tensor.scalarMultiplication(tensor, scalar)`

##### `tensor.scalarMultiplication(scalar)`

## License

[MIT](http://g14n.info/mit-license/)

[npm]: https://npmjs.org/
[bower]: http://bower.io/
[blog]: http://g14n.info/algebra/articles "algebra blog"
[composition-algebra]: https://en.wikipedia.org/wiki/Composition_algebra "Composition algebra"
[realField]: https://github.com/fibo/algebra/blob/master/src/realField.js "real field"
[algebra-cyclic]: http://npm.im/algebra-cyclic
[algebra-group]: http://npm.im/algebra-group
[algebra-ring]: http://npm.im/algebra-ring
[cayley-dickson]: http://npm.im/cayley-dickson
[indices-permutations]: http://npm.im/indices-permutations
[laplace-determinant]: http://npm.im/laplace-determinant
[matrix-multiplication]: http://npm.im/matrix-multiplication
[multidim-array-index]: http://npm.im/multidim-array-index
[tensor-contraction]: http://npm.im/tensor-contraction
[tensor-permutation]: http://npm.im/tensor-product
[zero_divisor]: https://en.wikipedia.org/wiki/Zero_divisor "Zero divisor"
[Cayley-Dickson_construction]: https://en.wikipedia.org/wiki/Cayley%E2%80%93Dickson_construction "Cayley-Dickson construction"
