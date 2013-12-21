# Development
===========
## Set-up


### Vagrant

Vagrant is an environment automation tool. If you don't know what it is, [head over to the project website](http://vagrantup.com) to read more.

Algebra is shipped with a pre-configured fully functional vagrant environment. This means that after cloning the repo you will be able to start hacking on Algebra doing a simple `vagrant up` from the *vagrant* folder.

If you don't have Vagrant installed on your system, go to [vagrantup.com](http://vagrantup.com) and download the latest vagrant binary. **Note**: Vagrant creates a virtual machine and set it up with all the required packages. In order to use it, you will need to install Virtual Box, VMWare or Parallels.


#### Installation:

1. Clone the repository  
```javascript
    git clone https://github.com/fibo/algebra.git
    cd algebra/vagrant
```

2. From within the vagrant folder type in console `vagrant up`. Vagrant will take care of the rest. When launching for the first time you will probably need to download the whole operating system, this is a one time operation.


#### Usage
1. `vagrant up` - Will launch the VM and set-up the full development environment (after the first launch will be a matter of seconds).
2. `vagrant halt` - Will halt the VM keeping the state intact.
3. `vagrant destroy` - Will destroy the VM state. You can respawn it with `vagrant up` but will need a few minutes before being up and running.
4. `vagrant ssh` will let you interact with the virtual machine as with a normal remote host.
5. **Working Directory**: `/var/www/algebra` is in automatic sync with `/..`


### Bare (Repository)

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

---------------------------


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

