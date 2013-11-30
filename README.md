algebra
=======

Vectors, Matrices, Tensors for Node.js

[![Build Status](https://travis-ci.org/fibo/algebra.png?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![NPM version](https://badge.fury.io/js/algebra.png)](http://badge.fury.io/js/algebra)

![on-quaternions-and-octonions!](https://raw.github.com/fibo/algebra/master/images/Cover-OnQuaternionsAndOctonions.png) ![Algebra!](https://raw.github.com/fibo/algebra/master/images/Cover-Algebra.png)
 
# Installation

    npm install algebra

# Description

I'm implementing matrices and vectors on few algebra fields
(Reals, Complexes etc.) following Micheal Artin's "Algebra",
which was my book at [Universita' Degli Studi di Genova](http://www.dima.unige.it).

My goal is to provide users with the feature of creating their own algebra field and building vector spaces and matrices on it.

Suppose for example the set of strings with the concatenation operator,
it could be extended to a group and maybe to a field and build "matrices of strings" or probably in the future ... "strings of matrices" (I had an intuition about a composition law for UTF-8 chars).

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

    console.log(z1.data); // [-5, 10]

    // Many chainable operators are available.
    z1.conj().mul([2, 0]);

    console.log(z1.data); // [-10, 20]

## Vectors

    var algebra = require('algebra');

    // Rn is a class representing a real vector space of dimension = n
    var Rn = algebra.Real.VectorSpace;

    // Create a real vector space with dimension = 2, a.k.a. the cartesian plane
    var R2 = new Rn(2);

    // Create two vectors
    // v1 = (1, 1)
    // v2 = (2, 4)
    var v1 = new R2.Vector(1, 1);
    var v2 = new R2.Vector(2, 4);

    // Add v2 to v1
    v1.add(v2); // (1, 1) + (2, 4) = (3, 5)

    console.log(v1.data); // [3, 5]

## Matrices

    var algebra = require('algebra');

    // GLnR is the Real General Linear Group of invertible matrices of order n
    var GLnR = algebra.Real.GeneralLinearGroup;

    // Create the group of 2x2 invertible matrices
    var GL2R = new GLnR(2);

    // Create two invertible matrices:
    //
    //       | 1 2 |         | -1 0 |
    //       | 3 4 |   and   |  0 1 |
    //
    var m1 = new GL2R.Matrix(1, 2,
                             3, 4);

    var m2 = new GL2R.Matrix(-1, 0,
                              0, 1);

    // Multiply m1 by m2 at right side
    //       | 1 2 | * | -1 0 | = | -1 2 |
    //       | 3 4 |   |  0 1 |   | -3 4 |
    m1.mul(m2);

    console.log(m1.data); // [1, 2, 3, 4]

    // Check out m1 determinant, should be 2 = (1 * 4 - 3 * 2) * (-1 * 1 - 0 * 0)
    console.log(m1.determinant.data); // 2


# Documentation

See [examples] (https://fibo/github.io/algebra).

# Support

## Issues

Please use [algebra's bug tracker](https://github.com/fibo/algebra/issues) on github: patches welcome.

## Human contact

My skype and gtalk is `casati.gianluca`, contact me if you can give me some advice about coding this lib or if you have passion for math. I'm located in Milan and Genoa, it could be possible to have a pizza or a beer :)

# Development

## Repository

Clone the repository

    git clone https://github.com/fibo/algebra.git
    cd algebra

Switch to develop branch

    git checkout -b develop origin/develop

Install deps

    npm install

Install grunt-cli

    npm uninstall -g grunt-cli
    npm install -g grunt-cli

## Iterative development

Start watching files

    grunt watch

Modified `spec/*.coffee` files will be compiled to `test/*.js`.
Modified `lib/*.js` will trigger tests.

## Testing

Say hello to the nyan cat :)

    npm test

## Browserify

Install browserify globally

    npm install browserify -g

Build algebra client lib

    browserify index.js -o algebra.js

## Wiki

How I added wiki submodule 

    git submodule add https://github.com/fibo/algebra.wiki.git wiki

Generate one wiki page from tests

    node_modules/.bin/mocha -R markdown test/Element.js > wiki/Element-class.md



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fibo/algebra/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

