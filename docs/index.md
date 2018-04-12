---
title: algebra
---
# algebra

> Vectors, Matrices; Real, Complex, Quaternion; custom groups and rings for Node.js

> **New**: checkout matrices and vectors made of strings, with [cyclic algebra](#cyclic).

**NOTA BENE** Imagine all code examples below as written in some REPL where expected output is documented as a comment.

[![NPM version](https://badge.fury.io/js/algebra.svg)](http://badge.fury.io/js/algebra)
[![Badge size](https://badge-size.herokuapp.com/fibo/algebra/master/dist/algebra.js)](https://github.com/fibo/algebra/blob/master/dist/algebra.js)
[![Build Status](https://travis-ci.org/fibo/algebra.svg?branch=master)](https://travis-ci.org/fibo/algebra?branch=master)
[![Dependency Status](https://gemnasium.com/fibo/algebra.svg)](https://gemnasium.com/fibo/algebra)
[![Coverage Status](https://coveralls.io/repos/fibo/algebra/badge.svg?branch=master)](https://coveralls.io/r/fibo/algebra?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Test page](https://img.shields.io/badge/test-page-blue.svg)](http://g14n.info/algebra/test)
[![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/algebra/changelog)

[![Whatchers](https://g14n.info/svg/github/watchers/algebra.svg)](https://github.com/fibo/algebra/watchers) [![Stargazers](https://g14n.info/svg/github/stars/algebra.svg)](https://github.com/fibo/algebra/stargazers) [![Forks](https://g14n.info/svg/github/forks/algebra.svg)](https://github.com/fibo/algebra/network/members)

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
* [tensor-product]

## Features

* Real, Complex, Quaternion, Octonion numbers.
* [Vector](#vectors) and [Matrix](#matrices) spaces over any field (included [Real numbers](#real), of course :).
* Expressive syntax.
* Everything is a Tensor.
* [Immutable objects](https://en.wikipedia.org/wiki/Immutable_object).

## Installation

With [npm] do

```bash
npm install algebra
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

const z1 = new C([1, 2])
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
const v1 = new R2([0, 1])
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

const m2 = new R2x2([1, 0,
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
vector1.addition(vector1, vector1).equality([3, 6]) // true
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

Keeping in mind that *Byte* space defined above is an algebra, i.e. it has
composition laws well defined, you maybe already noticed that, for example
*byte2* could be seen as corresponding to 4, but in this strange structure
we created, 4 * 4 = 2.

You can play around with this structure.

```javascript
const max = byte1.add(byte2).add(byte3).add(byte4)
                 .add(byte5).add(byte6).add(byte7).add(byte8)

max.data // [t, t, t, t, t, t, t, t]
```

### Scalar

The [scalars](https://en.wikipedia.org/wiki/Scalar_(mathematics)) are the building blocks, they are the elements you can use to create vectors,
matrices, tensors. They are the underneath set enriched with a
[ring](https://en.wikipedia.org/wiki/Ring_(mathematics)) structure which
consists of two binary operators that generalize the arithmetic operations of addition and multiplication. A ring that has the commutativity property
is called *abelian* (in honour to [Abel](https://en.wikipedia.org/wiki/Niels_Henrik_Abel)) or also a **field**.

Ok, ret's make a simple example. [Real numbers](#real), with common addition
and multiplication are a scalar field: see documentation below. The good new
is that you can create any scalar field as long as you provide a set with
two internal operations and related neutral elements that satisfy the ring
axioms. That is why it will be used something maybe you did not expect could
be treated as an algebra: in the examples below during this section we will
play with the color space, giving a ring structure.

Let's consider the space of html colors in the form

> RGB: Red Green Blue

composed of three hexadecimal values from `00` to `ff`. Let's start
defining a sum operator on hexadecimals.

Credits and thanks for dec to hex and viceversa conversions goes to [this gist](https://gist.github.com/faisalman/4213592) author.

```javascript
const hexSum = (hex1, hex2) => {
  const dec1 = parseInt(hex1, 16) % 256
  const dec2 = parseInt(hex2, 16) % 256

  // Sum modulo 256 and convert to hexadecimal.
  const hexResult = parseInt((dec1 + dec2) % 256, 10).toString(16)

  // Return left padded result.
  return hexResult.length === 1 ? `0${hexResult}` : hexResult
}
```

Note that it is used modulo 256 cause we need that our set is *closed*
on this operator, it means that the sum of two colors must be another      color.

To define color sum we can split a color in an array of three hexadecimals,
and sum componentwise.

```javascript
const splitColor = (color) => {
  const r = color.substring(0, 2)
  const g = color.substring(2, 4)
  const b = color.substring(4, 6)

  return [r, g, b]
}
```

For example, white color `ffffff` will be splitted in `['ff', 'ff', 'ff']`.

```javascript
const colorSum = (color1, color2) => {
  const [r1, g1, b1] = splitColor(color1)
  const [r2, g2, b2] = splitColor(color2)

  const r = hexSum(r1, r2)
  const g = hexSum(g1, g2)
  const b = hexSum(b1, b2)

  return [r, g, b]
}
```

You can check that this sum is *well defined*, and for example, green plus
blue equals cyan.

```javascript
colorSum('00ff00', '0000ff') // '00ffff'
```

The neutral element respect to this operator is *black* (`000000`).

To define a scalar field we need another operation to be used as multiplication.
Let's define a multiplication on hexadecimals first.

```javascript
const hexMul = (hex1, hex2) => {
  const dec1 = parseInt(hex1, 16) % 256
  const dec2 = parseInt(hex2, 16) % 256

  // Multiply, then divide by 255 and convert to hexadecimal.
  const hexResult = parseInt((dec1 * dec2) / 255, 10).toString(16)

  // Return left padded result.
  return hexResult.length === 1 ? `0${hexResult}` : hexResult
}
```

Then similarly to `colorSum` it is possible to define a `colorMul` that
applies `hexMul` componentwise.

```javascript
const colorMul = (color1, color2) => {
  const [r1, g1, b1] = splitColor(color1)
  const [r2, g2, b2] = splitColor(color2)

  const r = hexMul(r1, r2)
  const g = hexMul(g1, g2)
  const b = hexMul(b1, b2)

  return [r, g, b]
}
```

The neutral element for this operator is *white* (`ffffff`).

We are ready to create our scalar field over RGB colors.
Arguments are the same as [algebra-ring].

```javascript
const RGB = algebra.Scalar(
  [ '000000', 'ffffff' ],
  {
    equality: (a, b) => a === b,
    contains: (color) => {
      const [r, g, b] = splitColor(color)

      return (parseInt(r, 16) < 256) && (parseInt(g, 16) < 256) && (parseInt(b, 16) < 256)
    },
    addition: colorSum,
    negation: (color) => {
      const [r, g, b] = splitColor(color)

      const decR = parseInt(r, 16)
      const decG = parseInt(g, 16)
      const decB = parseInt(b, 16)

      const minusR = decR === 0 ? 0 : 256 - decR
      const minusG = decG === 0 ? 0 : 256 - decG
      const minusB = decB === 0 ? 0 : 256 - decB

      const hexMinusR = parseInt(minusR, 10).toString(16)
      const hexMinusG = parseInt(minusG, 10).toString(16)
      const hexMinusB = parseInt(minusB, 10).toString(16)

      const paddedMinusR = hexMinusR.length === 1 ? `0${hexMinusR}` : hexMinusR
      const paddedMinusG = hexMinusG.length === 1 ? `0${hexMinusG}` : hexMinusG
      const paddedMinusB = hexMinusB.length === 1 ? `0${hexMinusB}` : hexMinusB

      return `${paddedMinusR}${paddedMinusG}${paddedMinusB}`
    },
    multiplication: colorMul,
    inversion: (color) => {
      const [r, g, b] = splitColor(color)

      const decR = parseInt(r, 16)
      const decG = parseInt(g, 16)
      const decB = parseInt(b, 16)

      const invR = parseInt(255 * 255 / decR, 10).toString(16)
      const invG = parseInt(255 * 255 / decG, 10).toString(16)
      const invB = parseInt(255 * 255 / decB, 10).toString(16)

      const paddedInvR = invR.length === 1 ? `0${invR}` : invR
      const paddedInvG = invG.length === 1 ? `0${invG}` : invG
      const paddedInvB = invB.length === 1 ? `0${invB}` : invB

      return `${paddedInvR}${paddedInvG}${paddedInvB}`
    },
  }
)
```

So far so good, algebra dependencies will do some checks under the hood
and complain if something looks wrong. Now we can create color instances

```javascript
const green = new RGB('00ff00')
const blue = new RGB('0000ff')
```

#### Scalar attributes

##### `Scalar.one`

Is the *neutral element* for [multiplication](#scalar-multiplication) operator.
In our *RGB* example it corrensponds to *white* (`ffffff`).

```javascript
RGB.one // 'ffffff'
```

##### `Scalar.zero`

Is the *neutral element* for [addition](#scalar-addition) operator.
In our *RGB* example it corrensponds to *black* (`000000`)

```javascript
RGB.zero // '000000'
```

#### Scalar order

It is always 0 for scalars, see also [Tensor order](#tensor-order).

##### `Scalar.order`

The *order* is a static attribute.

```javascript
RGB.order // 0
```

##### `scalar.order`

The *order* is also available as attribute of a Scalar class instance.

```javascript
green.order // 0
```

##### `scalar.data`

#### Scalar operators

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

![Mandelbrot Set](https://upload.wikimedia.org/wikipedia/commons/a/a4/Mandelbrot_sequence_new.gif)

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

A *Vector* class inherits everything from [Tensor](#tensor).

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

A *Matrix* class inherits everything from [Tensor](#tensor).

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

### Tensor

#### `TensorSpace(Scalar)(indices)`

#### `Tensor.one`

#### `Tensor.zero`

#### `tensor.data`

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

#### `Tensor.contains(tensor1, tensor2[, tensor3, … ])`

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
tensor1.equality(tensor2) // false
```

#### Tensor disequality

#### `Tensor.disequality(tensor1, tensor2)`

##### `tensor1.disequality(tensor2)`

#### Tensor addition

##### `Tensor.addition(tensor1, tensor2[, tensor3, … ])`

##### `tensor1.addition(tensor2[, tensor3, … ])`

#### Tensor subtraction

##### `Tensor.subtraction(tensor1, tensor2[, tensor3, … ])`

##### `tensor1.subtraction(tensor2[, tensor3, … ])`

#### Tensor product

##### `Tensor.product(tensor1, tensor2)`

##### `tensor1.product(tensor2)`

#### Tensor contraction

##### `Tensor.contraction()`

##### `tensor.contraction()`

#### Tensor negation

##### `Tensor.negation(tensor1)`

##### `tensor.negation()`

#### Tensor scalar multiplication

##### `Tensor.scalarMultiplication(tensor, scalar)`

##### `tensor.scalarMultiplication(scalar)`

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
