const convertObjectToArray = (object) => {
  return Object.keys(object).map(key => object[key])
}

module.exports = {
  convertObjectToArray
}