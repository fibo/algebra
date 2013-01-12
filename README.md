algebra
=======

Vectors, Matrices and more

# Installation

    npm install algebra

# Quick start

This is a 60 seconds tutorial to get your hands dirty with `algebra`.

## Complex numbers

    var algebra = require('algebra');

    var Complex = algebra.Complex.Element;

    // Create two complex numbers
    // z1 = 1 + 2i
    // z2 = 3 + 4i
    var z1 = new Complex(1, 2);
    var z2 = new Complex(3, 4);

    // Multiply z1 by z2.
    z1.mul(z2); // (1 + 2i) * (3 + 4i) = -5 + 10i

    console.log(z1.xy()); // [-5, 10]

## Vectors

    var algebra = require('algebra');

    // Rn is a class representing a real vector space of dimension = n.
    var Rn = algebra.Real.VectorSpace;

    // Create a real vector space with dimension = 2, a.k.a. the cartesian plane.
    var R2 = new Rn(2);

    // Create two vectors
    // v1 = (1, 1)
    // v2 = (2, 4)
    var v1 = new R2.Vector(1, 1);
    var v2 = new R2.Vector(2, 4);

    // Add v2 to v1.
    v1.add(v2); // (1, 1) + (2, 4) = (3, 5)

    console.log(v1.getCoordinates()); // [3, 5]

## Matrices

    var algebra = require('algebra');

    var MnR = algebra.Real.MatrixRing;
    var M2R = new MnR(2);

    var m1 = new M2R.Matrix(1, 2, 3, 4);

    // coming soon :P

# Description

I'm implementing matrices and vectors on few algebra fields
(Reals, Complexes etc.) following Micheal Artin's "Algebra",
which was my book at Universita' Degli Studi di Genova.

My goal is to provide users with the feature of creating their own algebra field and building vector spaces and matrices on it.

Suppose for example the set of strings with the concatenation operator,
it could be extended to a group and maybe to a field and build "matrices of strings" or probably in the future ... "strings of matrices" (I'd an intuition about a composition law for UTF-8 chars).

# Documentation

See the [Wiki] (https://github.com/fibo/algebra/wiki).

# Development

## Coding style

See [Felix's Node.js Style Guide] (http://nodeguide.com/style.html).

## Testing

Install mocha globally

    npm install mocha -g

Then run tests

    npm test

( and say hello to the nyan cat :)

