// middleware for centralized error handling

// Middleware for centralized error handling
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message || "Unknown error"}`);

  // Set the status code, default to 500 if not provided
  const statusCode = err.statusCode || 500;

  // Set the error message, default to "Internal Server Error" if not provided
  const message = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });

  next();
};

module.exports = errorHandler;
