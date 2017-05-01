---
title: TeX snippets
description: how write math in browsers
layout: page
---

# {{ page.title }}

TeX source code is stored in *.tex* files found in [display](https://github.com/fibo/algebra/tree/master/gh-pages/tex-snippets/display) and [inline](https://github.com/fibo/algebra/tree/master/gh-pages/tex-snippets/inline) *tex-snippets* folder.
They are rendered by [KaTeX](https://github.com/Khan/KaTeX) cli, which is invoked by `npm run tex` command, to homonym *.html* files into [display](https://github.com/fibo/algebra/tree/master/gh-pages/_includes/display) and [inline](https://github.com/fibo/algebra/tree/master/gh-pages/_includes/inline) *_includes* folder respectively.

> Every TeX snippet created should be included in this index page

## Inline-mode snippets

{% include inline/for-any-real.html %}

{% include inline/for-any-complex.html %}

## Display-mode snippets

{% include display/matrix.html %}

