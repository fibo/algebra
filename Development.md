# Development
===========

## Vagrant








## Bare (Repository)

If you like to develop locally with your machine already configured with Node and NPM simply follow these steps:

1. Clone the repository  
```javascript
    git clone https://github.com/fibo/algebra.git
    cd algebra
```

2. Switch to develop branch  
```javascript
    git checkout -b develop origin/develop
    ```

3. Install deps
```javascript
    npm install
```
4. Install grunt-cli globally
```javascript
    npm uninstall -g grunt-cli
    npm install -g grunt-cli
```
5. Install browserify globally
```javascript
    npm install browserify -g
```
## Iterative development

Start watching files

    grunt watch

Modified `spec/*.coffee` files will be compiled to `test/*.js`.
Modified `lib/*.js` will trigger tests.

## Testing

Say hello to the nyan cat :)

    npm test

## Browserify


Build algebra client lib

    browserify index.js -o algebra.js

## Wiki

How I added wiki submodule 

    git submodule add https://github.com/fibo/algebra.wiki.git wiki

Generate one wiki page from tests

    node_modules/.bin/mocha -R markdown test/Element.js > wiki/Element-class.md

