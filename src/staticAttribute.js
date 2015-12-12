const staticAttribute = (obj, name, get) => {
  Object.defineProperty(this, name, {
    writable: false,
    get: get
  })
}

module.exports = staticAttribute
