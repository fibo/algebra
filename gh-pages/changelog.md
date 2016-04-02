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

- Replaced jshint with standardjs
- algebra-cyclic
- Scalar
- generate tag links in changelog

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
