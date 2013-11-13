Development
===========

# Repository

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

# Iterative development

Start watching files

    grunt watch

Modified `spec/*.coffee` files will be compiled to `test/*.js`.
Modified `lib/*.js` will trigger tests.

## Testing

Say hello to the nyan cat :)

    npm test

# Browserify

Install browserify globally

    npm install browserify -g

Build algebra client lib

    browserify index.js -o algebra.js

# Wiki

How I added wiki submodule 

    git submodule add https://github.com/fibo/algebra.wiki.git wiki

Generate one wiki page from tests

    node_modules/.bin/mocha -R markdown test/Element.js > wiki/Element-class.md

