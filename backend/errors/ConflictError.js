const { HTTP_STATUS_CONFLICT } = require('http2').constants;

module.exports = class NotFountError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
};
