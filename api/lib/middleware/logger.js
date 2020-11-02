'use strict';

module.exports = (req, res, next) => {
  console.log(`Path: ${req.path} request method: ${req.method} Time: ${req.reqTime}`) 
  next();
}

// Execute a console.log() containing the request path, method, and the requestTime property of the request object
// Import this into your server and set it up to run at the application level for all routes