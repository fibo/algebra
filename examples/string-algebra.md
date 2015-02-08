


```

var chars = ' 0123456789abcdefghijklmnopqrstuvwxyz'

console.log(chars.length) // 37 which is prime

function isPrime(n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
 var m=Math.sqrt(n);
 for (var i=2;i<=m;i++) if (n%i==0) return false;
 return true;
}

function numOf(char) {
 if (char === '') return 0
  return chars.indexOf(char)
}

function addition (str1, str2) {
  var n = numOf(str1) + numOf(str2)
  n = n % chars.length
  return chars[n]
}

function subtraction (str1, str2) {
 var n = numOf(str1) - numOf(str2)
  n = n % chars.length
  return chars[n]
}
function contains (char) {
  if (char === '') return true
  return (typeof char === 'string') && (char.length === 1) && (chars.indexOf(char) > -1)
}

function multiplication (str1, str2) {
 var n = numOf(str1) * numOf(str2)
  n = n % chars.length
  return chars[n]
}

function inverse (char) {
  for (var i = 0; i < chars.length; i++)
    if(chars[1] == multiplication(char, chars[i]))
    return chars[i]
}

function division (str1, str2) {
  return multiplication(str1, inverse(str2))
}

```
