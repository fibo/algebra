---
title: What is a tensor?
description: Understanding tensor definition, from plain numbers, through vectors and matrices, to tensors.
layout: post
---

There are many definitions for a [Tensor][1]. I will start from scratch: everybody
should know what a number is, so lets take three numbers

```
a = 1
b = 2
c = 3
```

In tensor jargon they can be called **real scalars** and they have **order** zero.
There is an elementary rule known as [Distributive property][2]

```
c * (a + b) = (c * a) + (c * b)
```

which is easy to check for *scalars*.

A real scalar can be represented geometrically by a point on a line, while if we
need to identify a point in a plane we can use two coordinates. Such a point it is said to be represented by a **real vector** and they have *order* one.
That means that the components of the vector are represented by one index varying
from zero to the dimension of the space containing the vector.
For example, given two vectors in a plane

```
a = [4, 5]
b = [-2, 1]
```

our dimension is two, and vector *a* can be represented as *a_i* where index *i*
can be 0 or 1. For instance *a_0 = 4* and *a_1 = 5* are the two coordinates.
Vectors inherits an addition operator naturally given by addition on each component. For example

```
a + b = [a_0 + b_0, a_1 + b_1] = [4 - 2, 5 + 1] = [2, 6]
```

Idem for subtraction. If we consider a scalar `c = 2` we can check that [Scalar multiplication][3] preserves the [Distributive property][2] in fact

```
[4, 12] = 2 * [2, 6] = c * (a + b) = (c * a) + (c * b) = [8, 10] + [-4, 2] = [4, 12]
```

So far so good, this can be generalized also for higher dimensions. Now, I would
introduce the concept of matrix, the reader may already know since they are used
to describe geometric transformations, solve linear system, even to render the screen
you are looking at now, it is used a matrix to represent the pixels.
A matrix has two indices, one for rows and one for columns. For instance

```
{% include display/matrix.html %}
```

The magic of tensors is that they generalize scalars, vectors and matrices and their operators,
that is why I would like to build a matrix as the result of a [Tensor product][4]
between two vectors.
The product of two tensors *a* and *b* is a tensor *t* which order is the sum of orders of *a* and *b* and which components are given by multiply each component.
For example, if we multiply our two vectors we obtain a matrix, which is a tensor of order two, which components are given by two indices

```
m = a x b = [4, 5] x [-2, 1] = [4 * (-2), 4 * 1, = [-8,  4,
                                5 * (-2), 5 * 1]    -10, 5]
```

where `m_i_j = a_i * b_j`, lets write it explicitly

```
m_0_0 = a_0 * b_0 = 4 * (-2) = -8
m_0_1 = a_0 * b_1 = 4 * 1 = 4
m_1_0 = a_1 * b_0 = 5 * (-2) = -10
m_1_1 = a_1 * b_1 = 5 * 1  = 5
```

It is so possible to build tensors of any order.

To complete the picture, there is another useful operator that is [Tensor contraction][5].
Given a tensor *t* of order *N* greater than one, with indices *i_1, …, i_N*,
choosing two indices *i_a* and *i_b*, we can create another tensor of order *N - 2*
which components are given by summing over the indices choosed.
For example, if we have a tensor *t* of order three, where *t_i_j_k* is a component
and indexes vary from 0 to 2, choosing the first and the last index, the result
after contraction is a tensor *s* which component *s_j* is given by

```
s_0 = sum t_i_0_k = t_0_0_0 + t_1_0_0 + … + t_2_0_2
s_1 = sum t_i_1_k = t_0_1_0 + t_1_1_0 + … + t_2_1_2
s_0 = sum t_i_2_k = t_0_2_0 + t_1_2_0 + … + t_2_2_2
```

It is so possible to many operators with [Tensor product][4] and [Tensor contraction][5].

  [1]: https://en.wikipedia.org/wiki/Tensor "Tensor"
  [2]: https://en.wikipedia.org/wiki/Distributive_property "Distributive property"
  [3]: https://en.wikipedia.org/wiki/Scalar_multiplication "Scalar multiplication"
  [4]: https://en.wikipedia.org/wiki/Tensor_product "Tensor product"
  [5]: https://en.wikipedia.org/wiki/Tensor_contraction "Tensor contraction"

