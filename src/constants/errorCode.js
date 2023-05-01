const ERROR_CODE = {
  ACCOUNT_EXISTS: {
    message: 'Account already exists',
    errorCode: 1
  },
  CREATE_SUCCESS: {
    message: 'Create success',
    errorCode: 2
  },
  ERROR_SERVER: {
    errorCode: 9999
  }
}

module.exports = {
  ERROR_CODE
}
