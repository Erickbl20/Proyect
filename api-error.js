'use strict'

class ApiError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, ApiError)
  }
}

module.exports = ApiError
