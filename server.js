'use strict';

// bringing in express library
const express = require('express');

// Auth routers
const authRoutes = require('./auth/router.js');

// API Routers
const v1Routes = require('./api/routes/v1.js');

// API Middleware
const timestamp = require('./api/lib/middleware/timestamp.js');
const logger = require('./api/lib/middleware/logger.js');
const error404 = require('./api/libmiddleware/404.js');
const error500 = require('./api/lib/middleware/500.js');

// create an instance of express, save it into a variable gives you the ability that this variable is equal to whatever that function is- adding to that one instance of the function.
const app = express();

// body parser options // any time that you're planning on posting to an API- that's how we get the body of the request
app.use(express.urlencoded({
  extended:true,
}))

// Express middleware ... body parser
app.use(express.json());

// Add auth routes
app.use(authRoutes);

// Add API routes
app.use(v1Routes);

// Add middleware routes
app.use(timestamp);
app.use(logger);

app.use(error404);
app.use(error500);


module.exports = {
  server: app,
  start: (port) => {
  app.listen(port, () => console.log('running on', port));
  }
}