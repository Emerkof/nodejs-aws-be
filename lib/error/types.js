export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
    this.code = 404;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.message = message;
    this.code = 400;

    Error.captureStackTrace(this, this.constructor);
  }
}
