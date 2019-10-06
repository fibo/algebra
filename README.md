# algebra

> means completeness and balancing, from the Arabic word الجبر

[![NPM version](https://badge.fury.io/js/algebra.svg)](http://badge.fury.io/js/algebra)
[![Badge size](https://badge-size.herokuapp.com/fibo/algebra/master/dist/algebra.min.js)](https://github.com/fibo/algebra/blob/master/dist/algebra.min.js)
[![Build Status](https://travis-ci.org/fibo/algebra.svg?branch=master)](https://travis-ci.org/fibo/algebra?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/algebra/changelog)

![Algebra](http://g14n.info/algebra/images/Cover-Algebra.png)
![OnQuaternionsAndOctonions](http://g14n.info/algebra/images/Cover-OnQuaternionsAndOctonions.png)

## Table Of Contents

* [Features](#features)
* [Installation](#installation)
* [Quick start](#quick-start)
  1. [Scalars](#scalars)
  2. [Vectors](#vectors)
  3. [Matrices](#matrices)
* [API](#api)
  - [About operators](#about-operators)
  - [Composition Algebra](#composition-algebra)
  - [Scalar](#scalar)
  - [Real](#real)
  - [Complex](#complex)
  - [Quaternion](#quaternion)
  - [Octonion](#octonion)
  - [Common spaces](#common-spaces)
  - [Vector](#vector)
  - [Matrix](#matrix)
* [License](#license)

## Features

* Real, Complex, Quaternion, Octonion numbers.
* [Vector](#vectors) and [Matrix](#matrices) spaces over any field (included [Real numbers](#real), of course :).
* Expressive syntax.
* [Immutable objects](https://en.wikipedia.org/wiki/Immutable_object).

## Installation

With [npm] do

```bash
npm install algebra
```

or use a CDN adding this to your HTML page

```html
<script src="https://unpkg.com/algebra/dist/algebra.min.js"></script>
```

## Quick start

> This is a 60 seconds tutorial to get your hands dirty with *algebra*.

**NOTA BENE** Imagine all code examples below as written in some REPL where expected output is documented as a comment.

All code in the examples below should be contained into a single file, like [test/quickStart.js](https://github.com/fibo/algebra/blob/master/test/quickStart.js).

First of all, import *algebra* package.

```javascript
const algebra = require('algebra')
```

### Scalars

Use the Real numbers as scalars.

```javascript
const R = algebra.Real
```

Every operator is implemented both as a static function and as an object method.

Static operators return raw data, while class methods return object instances.

Use static addition operator to add three numbers.

```javascript
R.add(1, 2) // 3
```

Create two real number objects: x = 2, y = -2

```javascript
// x will be overwritten, see below
let x = new R(2)
const y = new R(-2)
```

The value *r* is the result of x multiplied by y.

```javascript
// 2 * (-2) = -4
const r = x.mul(y)

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
                     1,  0])

m2 = m2.mul(m3)

m2 // Matrix { data: [0, -1, 2, 0] }
```

Since m2 is a square matrix we can calculate its determinant.

```javascript
m2.determinant // Scalar { data: 2 }
```

## API

### About operators

All operators can be implemented as *static methods* and as *object methods*.
In both cases, operands are coerced to raw data.
As an example, consider addition of vectors in a *Cartesian Plane*.

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

Operators can be chained when it makes sense.

```javascript
vector1.addition(vector1).equality([2, 4]) // true
```

Objects are immutable

```javascript
vector1.data // still [1, 2]
```

### Composition Algebra

A [composition algebra][composition-algebra] is one of ℝ, ℂ, ℍ, O:
Real, Complex, Quaternion, Octonion.
A generic function is provided to iterate the [Cayley-Dickson construction][Cayley-Dickson_construction] over any field.

#### `CompositionAlgebra(field[, num])`

* *num* can be 1, 2, 4 or 8

Let's use for example the `algebra.Boole` which implements [Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra)
by exporting an object with all the stuff needed by [algebra-ring npm package][algebra-ring].

```javascript
const CompositionAlgebra = algebra.CompositionAlgebra

const Boole = algebra.Boole

const Bit = CompositionAlgebra(Boole)

Bit.contains(false) // true
Bit.contains(4) // false

const bit = new Bit(true)
Bit.addition(false).data // true
```

Not so exciting, let's build something more interesting.
Let's pass a second parameter, that is used to build a [Composition algebra][composition-algebra] over the given field.
It is something **experimental** also for me, right now I am writing this but I still do not know how it will behave. My idea (idea feliz) is that

> A byte is an octonion of bits

Maybe we can discover some new byte operator, taken from octonion rich algebra structure.
Create an octonion algebra over the binary field, a.k.a Z2 and create the
eight units.

```javascript
// n must be a power of two
const Byte = CompositionAlgebra(Boole, 8)

// Use a single char const for better indentation.
const t = true
const f = false

const byte1 = new Byte([t, f, f, f, f, f, f, f])
const byte2 = new Byte([f, t, f, f, f, f, f, f])
const byte3 = new Byte([f, f, t, f, f, f, f, f])
const byte4 = new Byte([f, f, f, t, f, f, f, f])
const byte5 = new Byte([f, f, f, f, t, f, f, f])
const byte6 = new Byte([f, f, f, f, f, t, f, f])
const byte7 = new Byte([f, f, f, f, f, f, t, f])
const byte8 = new Byte([f, f, f, f, f, f, f, t])
```

The first one corresponds to *one*, while the rest are immaginary units.
Every imaginary unit multiplied by itself gives -1, but since the
underlying field is homomorphic to Z2, -1 corresponds to 1.

```javascript
byte1.mul(byte1).data // [t, f, f, f, f, f, f, f]
byte2.mul(byte2).data // [t, f, f, f, f, f, f, f]
byte3.mul(byte3).data // [t, f, f, f, f, f, f, f]
byte4.mul(byte4).data // [t, f, f, f, f, f, f, f]
byte5.mul(byte5).data // [t, f, f, f, f, f, f, f]
byte6.mul(byte6).data // [t, f, f, f, f, f, f, f]
byte7.mul(byte7).data // [t, f, f, f, f, f, f, f]
byte8.mul(byte8).data // [t, f, f, f, f, f, f, f]
```

You can play around with this structure.

```javascript
const max = byte1.add(byte2).add(byte3).add(byte4)
                 .add(byte5).add(byte6).add(byte7).add(byte8)

max.data // [t, t, t, t, t, t, t, t]
```

### Scalar

The [scalars](https://en.wikipedia.org/wiki/Scalar_(mathematics)) are the building blocks, they are the elements you can use to create vectors and matrices.
They are the underneath set enriched with a [ring](https://en.wikipedia.org/wiki/Ring_(mathematics)) structure which
consists of two binary operators that generalize the arithmetic operations of addition and multiplication.
A ring that has the commutativity property is called *abelian* (in honour to [Abel](https://en.wikipedia.org/wiki/Niels_Henrik_Abel)) or also a **field**.

Ok, let's make a simple example. [Real numbers](#real), with common addition and multiplication are a *scalar field*.

The good new is that you can create any *scalar field* as long as you provide a set with two internal operations and related neutral elements that satisfy the ring axioms.

We are going to create a scalar field using `BigInt` elements to implement something similar to a [Rational Number](https://en.wikipedia.org/wiki/Rational_number). The idea is to use a couple of numbers, the first one is the *numerator* and the second one the *denominator*.

Arguments we need are the same as [algebra-ring]. Let's start by unities; every element is a couple of numbers, the
*numerator* and the *denominator*, hence unitites are:

* zero: `[ BigInt(0), BigInt(1) ]`
* one: `[ BigInt(1), BigInt(1) ]`

We need a function that computes the *Great Common Divisor*.

```javascript
function greatCommonDivisor (a, b) {
  if (b === BigInt(0)) {
    return a
  } else {
    return greatCommonDivisor(b, a % b)
  }
}
```

So now we can normalize a rational number, by removing the common divisors of numerator and denominator.

```javascript
function normalizeRational ([numerator, denominator]) {
  const divisor = greatCommonDivisor(numerator, denominator)

  return [numerator / divisor, denominator / divisor]
}
```

```javascript
const Rational = algebra.Scalar({
  zero: [BigInt(0), BigInt(1)],
  one: [BigInt(1), BigInt(1)],
  equality: ([n1, d1], [n2, d2]) => (n1 * d2 === n2 * d1),
  contains: ([n, d]) => (typeof n === 'bigint' && typeof d === 'bigint'),
  addition: ([n1, d1], [n2, d2]) => normalizeRational([n1 * d2 + n2 * d1, d1 * d2]),
  negation: ([n, d]) => ([-n, d]),
  multiplication: ([n1, d1], [n2, d2]) => normalizeRational([n1 * n2, d1 * d2]),
  inversion: ([n, d]) => ([d, n])
})
```

So far so good, algebra dependencies will do some checks under the hood and will complain if something looks wrong.

Let's create few rational numbers.

```javascript
const half = new Rational([BigInt(1), BigInt(2)])
const two = new Rational([BigInt(2), BigInt(1)])
```

#### `Scalar.one`

Is the *neutral element* for [multiplication](#scalar-multiplication) operator.

```javascript
Rational.one // [1n, 1n]
```

#### `Scalar.zero`

Is the *neutral element* for [addition](#scalar-addition) operator.

```javascript
Rational.zero // [0n, 1n]
```

#### `scalar.data`

The *data* attribute holds the raw data underneath our scalar instance.

```javascript
half.data // [1n, 2n]
```

#### `Scalar.contains(scalar)`

Checks a given argument is contained in the scalar field that was defined.

```javascript
Rational.contains(half) // true
Rational.contains([1n, 2n]) // true
```

#### `scalar1.belongsTo(Scalar)`

This is a class method that checks a scalar instance is contained in the given scalar field.

```javascript
half.belongsTo(Rational) // true
```

#### `Scalar.equality(scalar1, scalar2)`

Is a static method

```javascript
Rational.equality(half, [BigInt(5), BigInt(10)])
```

#### `scalar1.equals(scalar2)`

```javascript
half.equals([BigInt(2), BigInt(4)])
```

#### `Scalar.disequality(scalar1, scalar2)`

```javascript
Rational.disequality(half, two) // true
```

#### `scalar1.disequality(scalar2)`

```javascript
half.disequality(two) // true
```

#### `Scalar.addition(scalar1, scalar2)`

```javascript
Rational.addition(half, two) // [5n , 2n]
```

#### `scalar1.addition(scalar2)`

```javascript
half.addition(two) // Scalar { data: [5n, 2n] }
```

#### `Scalar.subtraction(scalar1, scalar2)`

```javascript
Rational.subtraction(two, half) // [3n , 2n]
```

#### `scalar1.subtraction(scalar2)`

```javascript
two.multiplication(half) // Scalar { data: [1n, 1n] }
```

#### `Scalar.multiplication(scalar1, scalar2)`

```javascript
Rational.multiplication(half, two) // [1n, 1n]
```

#### `scalar1.multiplication(scalar2)`

```javascript
half.multiplication(two) // Scalar { data: [1n, 1n] }
```

#### `Scalar.division(scalar1, scalar2)`

```javascript
Rational.division(two, half) // [1n, 4n]
```

#### `scalar1.division(scalar2)`

```javascript
half.division(two) // Scalar { data: [1n, 4n] }
```

#### `Scalar.negation(scalar)`

```javascript
Rational.negation(two) // [-2n, 1n]
```

#### `scalar.negation()`

```javascript
two.negation() // Scalar { data: [-2n, 1n] }
```

#### `Scalar.inversion(scalar)`

```javascript
Rational.inversion(two) // [1n, 2n]
```

#### `scalar.inversion()`

```javascript
two.inversion() // Scalar { data: [1n, 2n] }
```

<!-- TODO
#### `Scalar.conjugation(scalar)`

#### `scalar.conjugation()`
-->

### Real

Inherits everything from [Scalar](#scalar). Implements algebra of real numbers.

```javascript
const Real = algebra.Real

Real.addition(1, 2) // 3

const pi = new Real(Math.PI)
const twoPi = pi.mul(2)

Real.subtraction(twoPi, 2 * Math.PI) // 0
```

### Complex

Inherits everything from [Scalar](#scalar).

It is said the [Gauss](https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss) brain
is uncommonly big and folded, much more than the Einstein brain (both are conserved and studied).
Gauss was one of the biggest mathematicians and discovered many important
results in many mathematic areas. One of its biggest intuitions, in my opinion,
was to realize that the Complex number field is geometrically a plane.
The Complex numbers are an extension on the Real numbers, they have a real
part and an imaginary part.
The imaginary numbers, as named by Descartes later, were discovered by italian mathematicians [Cardano](https://en.wikipedia.org/wiki/Gerolamo_Cardano), [Bombelli](https://en.wikipedia.org/wiki/Rafael_Bombelli) among others
as a trick to solve third order equations.

Complex numbers are a goldmine for mathematics, they are incredibly rich
of deepest beauty: just as a divulgative example, take a look to the [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set), but please trust me,
this is nothing compared to the divine nature of Complex numbers.

![Mandelbrot Set](http://g14n.info/algebra/images/Mandelbrot.gif){:.responsive}

The first thing I noticed when I started to study the Complex numbers is
conjugation. Every Complex number has its conjugate, that is its simmetric
counterparte respect to the Real numbers line.

```javascript
const Complex = algebra.Complex

const complex1 = new Complex([1, 2])

complex1.conjugation() // Complex { data: [1, -2] }
```

### Quaternion

Inherits everything from [Scalar](#scalar).

Quaternions are not commutative, usually if you invert the operands in a multiplication you get
the same number in absolute value but with the sign inverted.

```javascript
const Quaternion = algebra.Quaternion

const j = new Quaternion([0, 1, 0, 0])
const k = new Quaternion([0, 0, 1, 0])

// j * k = - k * j
j.mul(k).equal(k.mul(j).neg()) // true
```

### Octonion

Inherits everything from [Scalar](#scalar).

Octonions are not associative, this is getting hard: `a * (b * c)` could be equal to the negation of `(a * b) * c`.

```javascript
const Octonion = algebra.Octonion

const a = new Octonion([0, 1, 0, 0, 0, 0, 0, 0])
const b = new Octonion([0, 0, 0, 0, 0, 1, 0, 0])
const c = new Octonion([0, 0, 0, 1, 0, 0, 0, 0])

// a * ( b * c )
const abc1 = a.mul(b.mul(c)) // Octonion { data: [0, 0, 0, 0, 0, 0, 0, -1] }

// (a * b) * c
const abc2 = a.mul(b).mul(c) // Octonion { data: [0, 0, 0, 0, 0, 0, 0, 1] }

Octonion.equality(Octonion.negation(abc1), abc2)
```

### Common spaces

#### R

The real line.

It is in alias of [Real](#real).

```javascript
const R = algebra.R
```

#### R2

The *Cartesian Plane*.

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

#### C2x2

Complex square matrices of rank 2.

```javascript
const C2x2 = algebra.C2x2
```

It is in alias of `MatrixSpace(Complex)(2)`.

#### H

Usually it is used the **H** in honour of [Sir Hamilton](https://en.wikipedia.org/wiki/William_Rowan_Hamilton).

It is in alias of [Quaternion](#quaternion).

```javascript
const H = algebra.H
```

### Vector

A *Vector* extends the concept of number, since it is defined as a tuple
of numbers.
For example, the [Cartesian plane](https://en.wikipedia.org/wiki/Cartesian_coordinate_system)
is a set where every point has two coordinates, the famous `(x, y)` that
is in fact a *vector* of dimension 2.
A [Scalar](#scalar) itself can be identified with a vector of dimension 1.

We have already seen an implementation of the plain: [R2](#r2).

If you want to find the position of an airplain, you need *latitute*, *longitude*
but also *altitude*, hence three coordinates. That is a 3-ple, a tuple with
three numbers, a vector of dimension 3.

An implementation of the vector space of dimension 3 over reals is given
by [R3](#r3).

#### `VectorSpace(Scalar)(dimension)`

#### Vector dimension

Strictly speaking, dimension of a Vector is the number of its elements.

##### `Vector.dimension`

It is a static class attribute.

```javascript
R2.dimension // 2
R3.dimension // 3
```

##### `vector.dimension`

It is also defined as a static instance attribute.

```javascript
const vector = new R2([1, 1])

vector.dimension // 2
```

### Vector norm

The *norm*, at the end, is the square of the vector length: the good old
[Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).
It is usually defined as the sum of the squares of the coordinates.
Anyway, it must be a function that, given an element, returns a positive real number.
For example in [Complex](#complex) numbers it is defined as the multiplication of
an element and its conjugate: it works as a well defined norm.
It is a really important property since it shapes a metric space.
In the Euclidean topology it gives us the common sense of space,
but it is also important in other spaces, like a functional space.
In fact a *norm* gives us a *distance* defined as its square root, thus it
defines a metric space and hence a topology: a lot of good stuff.

#### `Vector.norm()`

Is a static operator that returns the square of the lenght of the vector.

```javascript
R2.norm([3, 4]).data // 25
```

#### `vector.norm`

This implements a static attribute that returns the square of the length of the vector instance.

```javascript
const vector = new R2([1, 2])

vector.norm.data // 5
```

#### Vector addition

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

#### Vector cross product

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

#### `MatrixSpace(Scalar)(numRows[, numCols])`

#### `Matrix.isSquare`

#### `Matrix.numCols`

#### `Matrix.numRows`

#### Matrix multiplication

##### `Matrix.multiplication(matrix1, matrix2)`

##### `matrix1.multiplication(matrix2)`

#### Matrix inversion

It is defined only for square matrices which [determinant](#matrix-determinant) is not zero.

##### `Matrix.inversion(matrix)`

##### `matrix.inversion`

#### Matrix determinant

It is defined only for square matrices.

##### `Matrix.determinant(matrix)`

##### `matrix.determinant`

#### Matrix adjoint

##### `Matrix.adjoint(matrix1)`

##### `matrix.adjoint`

## License

[MIT](http://g14n.info/mit-license/)

[npm]: https://npmjs.org/
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
[tensor-product]: http://npm.im/tensor-product
[zero_divisor]: https://en.wikipedia.org/wiki/Zero_divisor "Zero divisor"
[Cayley-Dickson_construction]: https://en.wikipedia.org/wiki/Cayley%E2%80%93Dickson_construction "Cayley-Dickson construction"
