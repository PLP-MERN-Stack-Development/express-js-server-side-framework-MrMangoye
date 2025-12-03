// Custom error classes
class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  }
  
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
  }
  
  // Global error handler
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      error: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong'
    });
  };
  
  module.exports = { NotFoundError, ValidationError, errorHandler };