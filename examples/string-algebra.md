


```
function addition (str1, str2) {
  return str1 + str2
}

function subtraction (str1, str2) {
  return str1.replace(str2, '')
}

function contains (str) {
  return typeof str === 'string'
}

function multiplication (str1, str2) {
  if (str1 === '') return ''
  if (str2 === '') return ''
  if (str1.trim().length === 0) return str2
  if (str2.trim().length === 0) return str1
  //TODO
}
```
