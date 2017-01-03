---
title: Change Log
permalink: /changelog
---

{% assign package = site.data.package %}
{% assign tags = site.data.tags %}

# Change Log

All notable changes to this project will be documented in this file.

<sub>This project adheres to [Semantic Versioning](http://semver.org/).
Changelog format adheres to [Keep a Changelog](http://keepachangelog.com/)</sub>

## [Unreleased]

### Added

UglifyJS with harmony branch.

## [v0.12.0] - 2016-11-05

### Removed

- Removed babel and uglify.

### Added

- updated deps and coverage.
- Refactored to ES2015 code.
- Vector multiplicated by matrix.

## [v0.11.0] - 2016-06-28

### Added

- More tests and examples
- createScalar(ring)
- some ES2015 refactored code
- updated deps and coverage

### Fixed

- fixed cyclic algebra

## [v0.10.1] - 2016-06-09

- Replaced jshint with standardjs
- fixed math formulas rendering in blog
- few tests added
- few doc improvements
- using new static-props features

## [v0.10.0] - 2016-04-16

### Added

- algebra-cyclic
- using matrix-multiplication package
- removed console.log from README.md examples
- data prop is enumerable
- tonicdev tutorial
- update to several deps, including static-props v1 and a fix of multidim-array-index
- updated coverage
- babel ES2015 preset

## [v0.9.0] - 2016-04-05

### Added

- new cool description: algebra means completeness and balancing
- crossProduct
- Scalar
- generate tag links in changelog
- 99% tests passing again, after Tensor refactoring

## [v0.8.0] - 2016-03-20

### Added

- Everything is a Tensor
- Composition algebra class
- dynamic changelog

## [v0.7.0] - 2016-03-09

### Added

- CHANGELOG.md
- CDN installation instructions
- svg badges and github social badges
- first tensor implementation
- minified code and source map

[Unreleased]: https://github.com/fibo/{{ package.name }}/compare/v{{ package.version }}...HEAD

{% for tag in tags offset:2 %}
  {% assign current = tags[forloop.index0].name %}
  {% assign previous = tags[forloop.index].name %}
  [{{ current }}]: https://github.com/fibo/{{ package.name }}/compare/{{ previous }}...{{ current }}
{% endfor %}
