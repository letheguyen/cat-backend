const ERROR_CODE = {
  EXISTS: {
    message: 'Already exists',
    errorCode: 1
  },
  CREATE_SUCCESS: {
    message: 'Create success',
    errorCode: 2
  },
  NO_DATA: {
    message: 'Not found',
    errorCode: 3
  },
  ERROR_SERVER: {
    errorCode: 9999
  },
}

module.exports = {
  ERROR_CODE
}
