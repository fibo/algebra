
var algebra = require('algebra'),
    should  = require('should')

var chars = '0123456789abcdefghijklmnopqrstuvwxyz '

function isPrime(n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
 var m=Math.sqrt(n);
 for (var i=2;i<=m;i++) if (n%i==0) return false;
 return true;
}

function numOf(char1) {
  return chars.indexOf(char1)
}

function addition (char1, char2) {
  var n = numOf(char1) + numOf(char2)
  n = n % chars.length
  return chars[n]
}

function subtraction (char1, char2) {
 var n = numOf(char1) - numOf(char2)
  n = n % chars.length
  return chars[n]
}

function contains (char1) {
  return (typeof char1 === 'string') && (char1.length === 1) && (chars.indexOf(char1) > -1)
}

function multiplication (char1, char2) {
 var n = numOf(char1) * numOf(char2)
  n = n % chars.length
  return chars[n]
}

function inversion (char1) {
  for (var i = 0; i < chars.length; i++)
    if(chars[1] == multiplication(char1, chars[i]))
    return chars[i]
}

function division (char1, char2) {
  return multiplication(char1, inversion(char2))
}

describe ('String Algebra', function () {
  it('chars length is a prime', function () {
    chars.length.should.be.eql(37)
    isPrime(chars.length).should.be.ok
  })

  it('addition', function () {
    addition('a', '0').should.eql('a')
    addition('a', 'b').should.eql('l')
  })

  it('inversion', function () {
    inversion('a').should.eql('q')
  })

  it('multiplication', function () {
    multiplication('a', '1').should.eql('a')
    multiplication('5', '3').should.eql('f')
  })

  it('division', function () {
    division('a', '1').should.eql('a')
  })

  it('inversion', function () {
    inversion('a').should.eql('q')
  })

  it('contains', function () {
    contains('a').should.be.ok
    contains(' ').should.be.ok
    contains('5').should.be.ok
  })

})


