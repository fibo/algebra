---
title: algebra
layout: project
---

> Vectors, Matrices, Tensors

{% include node_badges.md package='algebra' %}

![on-quaternions-and-octonions!](http://g14n.info/images/algebra/Cover-OnQuaternionsAndOctonions.png) ![Algebra!](http://g14n.info/images/algebra/Cover-Algebra.png)

## Installation

With [npm](https://npmjs.org/) do

```
npm install algebra
```

## Description

I'm implementing matrices and vectors on few algebra fields (Reals, Complexes etc.) following Micheal Artin's "Algebra", which was my book at [Università Degli Studi di Genova](http://www.dima.unige.it).

My goal is to provide users with the feature of creating their own algebra field and building vector spaces, matrices and tensors on it.

Suppose for example the set of strings with the concatenation operator, it could be extended to a group and maybe to a field and build "matrices of strings" or probably in the future ... "strings of matrices" (I had an intuition about a composition law for UTF-8 chars).

## Motivation

Why implement *algebra* with JavaScript? This is my first Node project, I started it cause I wanted to learn Node ... and I really like it!
I was thinking about

> How to implement an algebra field, like Real and Complex numbers and its elements?

Do you need to implement first the *Field* class or the *Element* class? In *Algebra* you start defining a *Group*, without specifing its elements; then you define a *Field* adding multiplication operator. Can the programming way be the same as the mathematician way?
I was looking at the answer coding this package.

Another motivation was to implements something similar to a Tensor, that is like a multi dimensional array, but I could not find any package with that spirit of adventure.

## Features

* Expressive api
* Vectors and Vector Spaces
* Invertible Matrices and the General Linear Group
* [Tensors](http://en.wikipedia.org/wiki/Tensor): scalars, vectors and matrices are also implemented as tensors.
* Algebra over custom fields

## Examples

Begin with [algebra quick start](http://g14n.info/algebra/examples/quick-start).

Other examples:

  * [Real number](http://g14n.info/algebra/examples/real-number)  
  * [Real vector](http://g14n.info/algebra/examples/real-vector)  
  * [Complex number](http:/g14n.info/algebra/examples/complex-number)  
  * [Custom field](http://g14n.info/algebra/examples/custom-field)  

