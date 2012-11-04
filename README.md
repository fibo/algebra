algebra
=======

Vectors, Matrices and more

# Installation

    npm install algebra

# Quick start

    var algebra = require('algebra');

    var Complex = algebra.Complex.Element;
    var MnR = algebra.Real.MatrixRing;
    var Rn = algebra.Real.VectorSpace;

    var R2 = new Rn(2);
    var M2R = new MnR(2);

    var z1 = new Complex(1, 2);
    var z2 = new Complex(3, 4);

    z1.mul(z2); // (1 + 2i) * (3 + 4i)

    console.log(z1.xy()); // [-5, 10]

# Description

I'm implementing matrices and vectors on few algebra fields
(Reals, Complexes etc.) following Micheal Artin's "Algebra",
which was my book at Universita' Degli Studi di Genova.

My goal is to provide users with the feature of creating their own algebra field and building vector spaces and matrices on it.

Suppose for example the set of strings with the concatenation operator,
it could be extended to a group and maybe to a field and build "matrices of strings".

# Documentation

See the [Wiki] (https://github.com/fibo/algebra/wiki).

# Development

## Branches

The git repository has the following remote branches:

  * real
  * complex
  * quaternion

## Testing

Install mocha globally

    npm install mocha -g

Then run tests

    npm test

( and say hello to the nyan cat :)

